import { findMinMaxIntervalControllerFactory } from '@/main/factories/find-min-max-intervals-controller-factory'
import { Db } from '@/infra/sqlite/utils/db'
import { Express } from 'express'

export const setupRouter = (app: Express, db: Db) => {
  app.get('/producers/awards/intervals', findMinMaxIntervalControllerFactory(db))
}
