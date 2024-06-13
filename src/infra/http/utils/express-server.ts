import express from 'express'

export function expressServer () {
  const app = express()
  let server: ReturnType<typeof app.listen> | undefined
  app.use(express.json())

  return {
    app,
    stop: () => server?.close(),
    start: () => {
      server = app.listen(3000, () => console.log('server running at http://localhost:3000'))
    }
  }
}
