import { openDb, Db } from '@/infra/sqlite/utils/db'
import { createDb } from '@/infra/sqlite/utils/create-db'
import { readCsv } from '@/infra/fs/read-csv'
import { expressServer } from '@/infra/http/utils/express-server'
import { setupRouter } from '@/main/config/setup-router'

export async function main () {
  const httpServer = expressServer()
  let db: Db | undefined = undefined

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
