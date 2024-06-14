import { main } from '../src/main/index'
import test from 'node:test'
import assert from 'node:assert'
import fetch from 'node-fetch'

test.describe('GET /producers/awards/intervals', () => {
  test.before(async () => {
    await main()
  })

  test.after(() => process.kill(process.pid, 'SIGTERM'))

  test.it('should fetch intervals correctly', async () => {
    const result = await fetch('http://localhost:3000/producers/awards/intervals')
    const data = await result.json() as any

    assert.deepEqual(result.status, 200)
    assert.deepEqual(!!data, true)
  })

  test.it('should return an object with correct shape', async () => {
    const result = await fetch('http://localhost:3000/producers/awards/intervals')
    const data = await result.json() as any

    assert.deepEqual(!!data.max, true)
    assert.deepEqual(typeof data.max[0].producer === 'string', true)
    assert.deepEqual(typeof data.max[0].interval === 'number', true)
    assert.deepEqual(typeof data.max[0].previousWin === 'number', true)
    assert.deepEqual(typeof data.max[0].followingWin === 'number', true)
    
    assert.deepEqual(!!data.min, true)
    assert.deepEqual(typeof data.min[0].producer === 'string', true)
    assert.deepEqual(typeof data.min[0].interval === 'number', true)
    assert.deepEqual(typeof data.min[0].previousWin === 'number', true)
    assert.deepEqual(typeof data.min[0].followingWin === 'number', true)
  })
})
