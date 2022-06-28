/* eslint-disable prefer-const */
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import minimist from 'minimist';
import { createCategories } from './categories';
import { Map } from 'typescript';
const args = minimist(process.argv.slice(2))

const app = express()
let port = 3000
if(args.port) port = args.port

const extensions = ['.jpg', '.jpeg', '.png', '.webp']

let categoryFiles = new Map()
createCategories().forEach(c => {
  let currentCategoryFiles: Array<string> = []
  fs.readdirSync(`./images/${c}`, {withFileTypes: true}).forEach(f => {
    if(extensions.includes(path.extname(f.name))) currentCategoryFiles.push(f.name)
  })
  if(currentCategoryFiles.length == 0) {return} else categoryFiles.set(c, currentCategoryFiles)
})

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomKey(map) {
  let index = Math.floor(Math.random() * map.size);
  let cntr = 0;
  for (let key of map.keys()) {
      if (cntr++ === index) {
          return key;
      }
  }
}

app.get('/images', (req, res) => {
  if(!req.query.category) return res.json({message: "Image category not specified."})
  if(!req.query.id) return res.json({message: "Image ID not specified."})
  if(!categoryFiles.has(req.query.category)) return res.json({message: "Specified category does not exist."})
  if(categoryFiles.get(req.query.category).length < req.query.id) return res.json({message: "Specified image ID does not exist."})
  const id = parseInt(req.query.id.toString())
  res.sendFile(`images/${req.query.category}/${categoryFiles.get(req.query.category)[id]}`, { root: "./" })
  
})

app.get('/images/random', (req, res) => {
  const choice = getRandomKey(categoryFiles)
  const files: Array<""> = categoryFiles.get(choice)
  const file = files[getRandomInt(0, files.length-1)]
  res.sendFile(`images/${choice}/${file}`, { root: "./" })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
  if(args.test) process.exit(0)
})

export { app }