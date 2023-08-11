import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

const chiknCollName: string = 'chikn-sales'

const maxPagesLimit: number = 10

async function getLatestChiknsSold(pageNumber: number = 0) {
  if (pageNumber > maxPagesLimit) return []

  try {
    const db = await getDb()

    let itemsPerPage = 10
    let skip = pageNumber * itemsPerPage
    let limit = itemsPerPage

    let result = await db
      .collection(chiknCollName)
      .find(
        {},
        {
          sort: { lastSoldDate: -1 },
          skip: skip,
          limit: limit,
          projection: {
            _id: 1,
            token: 1,
            lastSoldDate: 1,
            salePrice: { $multiply: [{ $toDouble: '$value' }, 1e-18] },
            kg: 1,
            rarity: 1,
            head: 1,
            neck: 1,
            torso: 1,
            feet: 1,
            tail: 1,
            body: 1,
            trim: 1,
            background: 1,
            _numOfTraits: 1,
          },
        }
      )
      .toArray()

    let transformedResults = result.map((item: any) => ({
      id: item._id,
      chiknId: item.token,
      kg: item.kg,
      price: item.salePrice,
      soldAt: item.lastSoldDate,
      rarity: item.rarity,
      head: item.head,
      neck: item.neck,
      torso: item.torso,
      feet: item.feet,
      tail: item.tail,
      body: item.body,
      trim: item.trim,
      background: item.background,
      numOfTraits: item._numOfTraits,
    }))

    return transformedResults
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageNo = searchParams.get('pageNo')

  // console.log('pageNumber:', pageNo)

  let result = await getLatestChiknsSold(Number(pageNo))

  // return new Response(JSON.stringify({ data: result }))
  return NextResponse.json({ data: result })
}
