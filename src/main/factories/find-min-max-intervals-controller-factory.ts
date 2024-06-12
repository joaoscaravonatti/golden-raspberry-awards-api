import { findMinMaxIntervals } from '@/domain/usecases/find-min-max-intervals'
import { findMinMaxIntervalsController } from '@/infra/http/find-min-max-intervals-controller'
import { producerIntervalsRepository } from '@/infra/sqlite/producer-intervals-repository'
import { Db } from '@/infra/sqlite/db'

export const findMinMaxIntervalControllerFactory = (db: Db) =>
  findMinMaxIntervalsController(
    findMinMaxIntervals(
      producerIntervalsRepository(db).findProducerIntervals
    )
  )
