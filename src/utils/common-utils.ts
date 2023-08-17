import getDb from './database'

export const updateOutlierConfig = async (key: string, value: any) => {
  try {
    const db = await getDb()

    const found = await db.collection('configs').findOne({
      key: key,
    })

    if (found) {
      //update config
      const updateRes = await db.collection('configs').updateOne(
        {
          key: key,
        },
        {
          $set: { value: value, updatedAt: new Date() },
        }
      )
      // console.log('upated:', updateRes)
      return updateRes
    } else {
      //create new config
      const createRes = await db
        .collection('configs')
        .insertOne({ key: key, value: value, updatedAt: new Date() })
      // console.log('created', createRes)
      return createRes
    }
  } catch (error) {
    throw error
  }
}
