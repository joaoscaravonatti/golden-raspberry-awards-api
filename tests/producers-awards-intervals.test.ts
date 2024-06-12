import { main } from '../src/main/index'
import test from 'node:test'
import assert from 'node:assert'
import fetch from 'node-fetch'

test.describe('GET /producers/awards/intervals', () => {
  test.before(async () => {
    await main()
  })

  test.after(() => process.kill(process.pid, 'SIGTERM'))

  test.it('Should fetch intervals correctly', async () => {
    const result = await fetch('http://localhost:3000/producers/awards/intervals')
    const data = await result.json() as any

    assert.deepEqual(!!data.min, true)
    assert.deepEqual(!!data.max, true)
    assert.deepEqual(data.min.length > 0, true)
    assert.deepEqual(data.max.length > 0, true)
  })
})
