import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

const collName: string = 'item-sales'
const maxPagesLimit = 10
const getLatestItemBuysFromWallet = async (
  walletAddress: string,
  pageNumber: number = 0
) => {
  if (pageNumber > maxPagesLimit) return []

  try {
    const db = await getDb()

    let itemsPerPage = 10
    let skip = pageNumber * itemsPerPage
    let limit = itemsPerPage

    let result = await db
      .collection(collName)
      .find(
        {
          to_address: walletAddress,
        },
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
            from_address: 1,
            to_address: 1,
          },
        }
      )
      .toArray()

    let transformedResults = result.map((item: any) => ({
      id: item._id,
      tokenId: item.token_id,
      name: item.name,
      description: item.description,
      price: item.salePrice,
      soldAt: item.block_timestamp,
      thumbnail: item.thumbnail,
      seller: item.from_address,
      buyer: item.to_address,
      properties: item.properties,
    }))

    // console.log(transformedResults)
    return transformedResults
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get('walletAddress')
  const pageNo = searchParams.get('pageNo')

  if (walletAddress === null || pageNo === null) {
    return NextResponse.json(
      { error: 'Parameters not valid.' },
      { status: 400 }
    )
  }

  let result = await getLatestItemBuysFromWallet(walletAddress, Number(pageNo))

  return NextResponse.json({ data: result }, { status: 200 })
}
