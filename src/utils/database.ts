import { MongoClient } from 'mongodb'

var uri = `${process.env.DB_URI}`

declare global {
  namespace globalThis {
    var _db: Promise<MongoClient>
  }
}

export default async function getDb() {
  if (global._db) {
    return global._db
  } else {
    console.log('Connecting to MongoDB...')
    console.log(uri)

    const client = new MongoClient(uri)

    try {
      // Connect to the MongoDB cluster
      await client.connect()

      let db: any = await client.db(process.env.DB_NAME)

      global._db = db
      console.log('Connected to DB')

      return global._db
    } catch (error) {
      throw error
    }
  }
}
