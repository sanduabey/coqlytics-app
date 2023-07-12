import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

const collName: string = 'chikn-sales'

const getChiknSalesByDate = async (from: Date, to: Date) => {
  try {
    const db = await getDb()

    let result = await db
      .collection(collName)
      .aggregate([
        {
          $project: {
            block_timestamp: {
              $dateFromString: {
                dateString: '$block_timestamp',
              },
            },
            token_id: 1,
            salePrice: 1,
          },
        },
        {
          $match: {
            $and: [
              {
                block_timestamp: { $lte: to },
              },
              {
                block_timestamp: { $gte: from },
              },
            ],
          },
        },
        {
          $sort: { block_timestamp: 1 },
        },
        {
          $group: {
            _id: {
              day: { $dayOfYear: '$block_timestamp' },
              year: { $year: '$block_timestamp' },
            },
            count: { $sum: 1 },
            volumeAVAX: { $sum: '$salePrice' },
            lastBlockTimestamp: { $last: '$block_timestamp' },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      .toArray()

    return result
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // const _from = searchParams.get('from');
  // const _to = searchParams.get('to')

  // const fromDate = new Date(_from);

  let now = new Date()
  let pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - 30)

  console.log(now)
  console.log(pastDate)

  let result = await getChiknSalesByDate(pastDate, now)

  return NextResponse.json({ data: result })
}
