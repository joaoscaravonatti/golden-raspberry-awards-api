import { findMinMaxIntervals } from '@/domain/usecases/find-min-max-intervals'
import { findMinMaxIntervalsController } from '@/infra/http/controllers/find-min-max-intervals-controller'
import { producerIntervalsRepository } from '@/infra/sqlite/repositories/producer-intervals-repository'
import { Db } from '@/infra/sqlite/utils/db'

export const findMinMaxIntervalControllerFactory = (db: Db) =>
  findMinMaxIntervalsController(
    findMinMaxIntervals(
      producerIntervalsRepository(db).findProducerIntervals
    )
  )
