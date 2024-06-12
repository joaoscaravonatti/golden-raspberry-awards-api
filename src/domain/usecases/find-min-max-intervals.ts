import { ProducerInterval } from '@/domain/entities/producer-interval'
import { FindProducerIntervalsRepository } from '@/domain/contracts/find-producer-intervals-repository'

export type FindMinMaxIntervals = () => Promise<{
  min: ProducerInterval[]
  max: ProducerInterval[]
}>

export const findMinMaxIntervals = (
  findProducerIntervalsRepository: FindProducerIntervalsRepository
): FindMinMaxIntervals => async () => {
  const intervals = ['min', 'max'] as const
  const [min, max] = await Promise.all(intervals.map(findProducerIntervalsRepository))

  return { min, max }
}
