import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

const collName: string = 'bp-sales'

const maxPagesLimit: number = 50

async function getLatestBlueprintSold(pageNumber: number = 0) {
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
          sort: { block_timestamp: -1 },
          skip: skip,
          limit: limit,
          projection: {
            _id: 1,
            token_id: 1,
            block_timestamp: 1,
            salePrice: { $multiply: [{ $toDouble: '$value' }, 1e-18] },
            name: 1,
            description: 1,
            thumbnail: 1,
            properties: 1,
          },
        }
      )
      .toArray()

    // console.log(result)

    let transformedResults = result.map((item: any) => ({
      id: item._id,
      tokenId: item.token_id,
      name: item.name,
      description: item.description,
      price: item.salePrice,
      soldAt: item.block_timestamp,
      thumbnail: item.thumbnail,
      properties: item.properties,
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

  let result = await getLatestBlueprintSold(Number(pageNo))

  // return new Response(JSON.stringify({ data: result }))
  return NextResponse.json({ data: result })
}
