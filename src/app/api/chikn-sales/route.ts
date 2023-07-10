import getDb from '@/utils/database'
import { ObjectId } from 'mongodb'

const chiknCollName: string = 'chikn-sales'
const DUMMY_LATEST_SALES = [
  {
    id: 1,
    chiknId: 123,
    soldAt: '2023-04-07T19:34:58.000Z',
    price: 36.95,
    kg: 42,
    rarity: 'nice',
  },
  {
    id: 2,
    chiknId: 124,
    soldAt: '2023-04-17T19:34:58.000Z',
    price: 95,
    kg: 48,
    rarity: 'common',
  },
  {
    id: 3,
    chiknId: 235,
    soldAt: '2023-04-07T19:34:58.000Z',
    price: 369,
    kg: 112,
    rarity: 'rare',
  },
]

// interface ChiknSale {
//   _id:ObjectId;
//   soldAt: string;
//   token: number;
//   salePrice: number;
//   rarity: string;
//   kg : number
// }

async function getLatestChiknsSold(limit: number) {
  try {
    const db = await getDb()

    let result = await db
      .collection(chiknCollName)
      .find(
        {},
        {
          sort: { lastSoldDate: -1 },
          limit: limit,
          projection: {
            _id: 1,
            token: 1,
            lastSoldDate: 1,
            salePrice: 1,
            kg: 1,
            rarity: 1,
          },
        }
      )
      .toArray()

    // let resultsToSend = await result.toArray()

    // console.log(result)

    let transformedResults = result.map((item: any) => ({
      id: item._id,
      chiknId: item.token,
      kg: item.kg,
      price: item.salePrice,
      soldAt: item.lastSoldDate,
      rarity: item.rarity,
    }))

    return transformedResults
  } catch (error) {
    throw error
  }
}

export async function GET(request: Request) {
  console.log('HERE')
  let result = await getLatestChiknsSold(10)
  return new Response(JSON.stringify({ data: result }))
}
