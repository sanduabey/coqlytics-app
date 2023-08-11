import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

const collName: string = 'farmland-sales'

const maxPagesLimit: number = 10

async function getLatestFarmlandSold(pageNumber: number = 0) {
  if (pageNumber > maxPagesLimit) return []

  try {
    const db = await getDb()

    let itemsPerPage = 10
    let skip = pageNumber * itemsPerPage
    let limit = itemsPerPage

    let result = await db
      .collection(collName)
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
            size: 1,
            rarity: 1,
            bigness: 1,
            multiplier: 1,
            score: 1,
            tiles: 1,
          },
        }
      )
      .toArray()

    // console.log(result)

    let transformedResults = result.map((item: any) => ({
      id: item._id,
      farmId: item.token,
      kg: item.kg,
      price: item.salePrice,
      soldAt: item.lastSoldDate,
      size: item.size,
      rarity: item.rarity,
      bigness: item.bigness,
      multiplier: item.multiplier,
      score: item.score,
      tiles: item.tiles,
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

  let result = await getLatestFarmlandSold(Number(pageNo))

  // return new Response(JSON.stringify({ data: result }))
  return NextResponse.json({ data: result })
}
