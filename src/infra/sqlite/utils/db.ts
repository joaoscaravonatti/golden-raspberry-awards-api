import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export type Db = Awaited<ReturnType<typeof open>>

export const openDb = async () => {
  return open({
    filename: ':memory:',
    driver: sqlite3.Database
  })
}
