import path from 'path'
import fs from 'fs/promises'

const moviesPath = path.resolve(__dirname, '..', '..', '..', 'movielist.csv')

export const readCsv = async () => {
  const result = await fs.readFile(moviesPath)
  const [, ...data] = result.toString().split('\n')
  
  return data.filter(Boolean)
}
