import { FindProducerIntervalsRepository } from '@/domain/contracts/find-producer-intervals-repository'
import { ProducerInterval } from '@/domain/entities/producer-interval'
import { Db } from '@/infra/sqlite/db'

const findProducerIntervals = (db: Db): FindProducerIntervalsRepository => async (type) => {
  const winners = await db.all(`
    SELECT p.name, m.year
    FROM producers p
    JOIN movie_producers mp ON p.id = mp.producer_id
    JOIN movies m ON mp.movie_id = m.id
    WHERE m.winner = ?
    ORDER BY p.name, m.year
  `, [1])

  const producerIntervals: { [producer: string]: number[] } = {}

  winners.forEach(({ name, year }) => {
    if (!producerIntervals[name]) {
      producerIntervals[name] = []
    }

    producerIntervals[name].push(year)
  })

  let result: ProducerInterval[] = []
  let targetInterval = type === 'min' ? Infinity : -Infinity

  for (const producer in producerIntervals) {
    const years = producerIntervals[producer]

    for (let i = 1; i < years.length; i++) {
      const interval = years[i] - years[i - 1];
      const movieInterval = new ProducerInterval(producer, interval, years[i - 1], years[i])

      if ((type === 'min' && interval < targetInterval) || (type === 'max' && interval > targetInterval)) {
        result = [movieInterval]
        targetInterval = interval
      } else if (interval === targetInterval) {
        result.push(movieInterval)
      }
    }
  }

  return result
}

export const producerIntervalsRepository = (db: Db) => ({
  findProducerIntervals: findProducerIntervals(db)
})
