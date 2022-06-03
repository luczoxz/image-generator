import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2))

const app = express()
let port = 3000
if(args.port) port = args.port


const extensions = ['.jpg', '.jpeg', '.png']
const files = fs.readdirSync("./images/").filter(function(file) {
    return extensions.includes(path.extname(file).toLowerCase());
});



app.get('/api/random', (req, res) => {
  const num = Math.floor(Math.random() * (files.length - 0)) + 0;
  res.json({message: "Random image ID generated", id: num})
})

app.get('/images', (req, res) => {
  if(!req.query.id) return res.json({message: "Image ID not specified."})
  if((req.query.id >= `${files.length-1}` || req.query.id < '0')) return res.json({code: 404, 
    message: "An image with the specified ID does not exist."
  })
  const id = parseInt(req.query.id.toString())
  res.sendFile(`images/${files[id]}`, { root: "./" })
  
})

app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
  if(args.test) process.kill(0)
})