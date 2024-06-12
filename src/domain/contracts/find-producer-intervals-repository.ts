import { ProducerInterval } from '@/domain/entities/producer-interval'

export type FindProducerIntervalsRepository = (type: 'max' | 'min') => Promise<ProducerInterval[]>
