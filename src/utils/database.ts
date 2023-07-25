import { MongoClient } from 'mongodb'

var uri = `${process.env.DB_URI}`

var _db: any

export default async function getDb() {
  if (_db) {
    // callback(null, _db);
    return _db
  } else {
    console.log('Connecting to MongoDB...')
    console.log(uri)

    const client = new MongoClient(uri)

    try {
      // Connect to the MongoDB cluster
      await client.connect()

      let db: any = await client.db(process.env.DB_NAME)

      _db = db
      console.log('Connected to DB')
      // callback(null, _db);
      return _db
    } catch (error) {
      throw error
    }
  }
}
