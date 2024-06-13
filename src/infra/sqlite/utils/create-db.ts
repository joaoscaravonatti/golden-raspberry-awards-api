import { Db } from './db'

export async function createDb (db: Db, data: string[]) {
  await createTables(db)
  await insertData(db, data)
}


async function insertData (db: Db, movies: string[]) {
  for (const movie of movies) {
    const [year, title, studios, producers, winner] = movie.split(';')
    const movieId = await insertMovie(db, Number(year), title, winner === 'yes')
    const splitRegex = /,\s*|and\s*/g

    for (const producer of producers.split(splitRegex)) {
      await insertProducer(db, producer, movieId)
    }

    for (const studio of studios.split(splitRegex)) {
      await insertStudio(db, studio, movieId)
    }
  }
}

async function createTables (db: Db) {
  await db.run(`CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    title TEXT,
    winner INTEGER
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS studios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS movie_producers (
    movie_id INTEGER,
    producer_id INTEGER,
    FOREIGN KEY(movie_id) REFERENCES movies(id),
    FOREIGN KEY(producer_id) REFERENCES producers(id)
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS movie_studios (
    movie_id INTEGER,
    studio_id INTEGER,
    FOREIGN KEY(movie_id) REFERENCES movies(id),
    FOREIGN KEY(studio_id) REFERENCES studios(id)
  )`)
}

async function insertMovie(db: Db, year: number, title: string, winner: boolean) {
  const result = await db.run('INSERT INTO movies (year, title, winner) VALUES (?, ?, ?)', [year, title, winner])

  return result.lastID!
}

async function insertProducer(db: Db, name: string, movieId: number) {
  const producer = await db.get('SELECT id FROM producers WHERE name = ?', [name])
  let producerId: number

  if (producer) {
    producerId = producer.id
  } else {
    const result = await db.run('INSERT INTO producers (name) VALUES (?)', [name])
    producerId = result.lastID!
  }

  await associateMovieProducer(db, movieId, producerId)
}

async function associateMovieProducer(db: Db, movieId: number, producerId: number) {
  await db.run('INSERT INTO movie_producers (movie_id, producer_id) VALUES (?, ?)', [movieId, producerId])
}

async function insertStudio(db: Db, name: string, movieId: number) {
  const studio = await db.get('SELECT id FROM studios WHERE name = ?', [name])
  let studioId

  if (studio) {
    studioId = studio.id
  } else {
    const result = await db.run('INSERT INTO studios (name) VALUES (?)', [name])
    studioId = result.lastID
  }

  await associateMovieStudio(db, movieId, studioId)
}

async function associateMovieStudio(db: Db, movieId: number, studioId: number) {
  await db.run('INSERT INTO movie_studios (movie_id, studio_id) VALUES (?, ?)', [movieId, studioId])
}
