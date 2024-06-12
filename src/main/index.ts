import { openDb, Db } from '@/infra/sqlite/db'
import { createDb } from '@/infra/sqlite/create-db'
import { readCsv } from '@/infra/fs/read-csv'
import { expressServer } from '@/infra/http/express-server'
import { setupRouter } from '@/main/setup-router'

export async function main () {
  let db: Db | undefined = undefined
  const httpServer = expressServer()

  const stopApp = () => {
    httpServer.stop()
    db?.close()
  }

  try {
    db = await openDb()
    const data = await readCsv()
    await createDb(db, data)
    setupRouter(httpServer.app, db)
    httpServer.start()
    process.on('SIGTERM', stopApp)
  } catch (error) {
    console.error(error)
  }
}
