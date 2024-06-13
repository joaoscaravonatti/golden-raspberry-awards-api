import { FindMinMaxIntervals } from '@/domain/usecases/find-min-max-intervals'
import { Request, Response } from 'express'

export const findMinMaxIntervalsController = (
  findMinMaxIntervals: FindMinMaxIntervals
) => async (request: Request, response: Response) => {
  try {
    const result = await findMinMaxIntervals()

    return response.status(200).json(result)
  } catch (error) {
    return response.status(500).send('Internal server error')
  }
}
