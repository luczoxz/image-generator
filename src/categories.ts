
import { readdirSync } from "fs"

const createCategories = () => {
    const a = readdirSync('./images', {withFileTypes: true})
    // eslint-disable-next-line prefer-const
    let directories: string[] = []
    a.forEach(e => {
        if(!e.isDirectory()) return
        directories.push(e.name)
    })
    return directories
}

export { createCategories }