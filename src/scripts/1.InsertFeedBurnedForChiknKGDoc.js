// import { MongoClient } from 'mongodb'

const { MongoClient } = require('mongodb')

const populateFeedForChiknKGGrowth = async () => {
  let values = getValueArray()

  let docToSave = {
    key: 'cumalativeFEEDBurnedAtChiknKG',
    value: values,
  }

  try {
    const db = await getDb()

    let response = await db.collection('configs').insertOne(docToSave)

    console.log(response)
    process.exit()
  } catch (error) {
    throw error
  }
}

const getValueArray = () => {
  let values = [0]
  let sum = 0

  for (let kg = 0; kg < 500; kg++) {
    let feedForKG = 25 * kg * kg

    sum = sum + feedForKG
    values.push(sum)
  }
  // console.log(values[500])
  return values
}

var uri = `mongodb://localhost:27017`

async function getDb() {
  console.log('Connecting to MongoDB...')
  console.log(uri)

  const client = new MongoClient(uri)

  try {
    // Connect to the MongoDB cluster
    await client.connect()

    let db = await client.db('coqlytics')

    console.log('Connected to DB')

    return db
  } catch (error) {
    throw error
  }
}

populateFeedForChiknKGGrowth()
