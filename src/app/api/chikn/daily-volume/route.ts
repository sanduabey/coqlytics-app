import getDb from '@/utils/database'
import { formatDateToDDMMMYYYY, getDatesArray } from '@/utils/helpers'
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

    //data transformation

    const timeZeroed = result.map((dailyData: any) => {
      let timezerodDate = new Date(dailyData.lastBlockTimestamp)
      timezerodDate.setUTCHours(0, 0, 0)
      return {
        date: timezerodDate,
        count: dailyData.count,
        volumeAVAX: dailyData.volumeAVAX,
      }
    })

    const allDatesArr = getDatesArray(from, to)

    const volumeArr = allDatesArr.map((date) => {
      let found = timeZeroed.find(
        (element: any) => element.date.getTime() === date.getTime()
      )

      if (found) {
        return found.volumeAVAX
      } else {
        return 0
      }
    })

    const countArr = allDatesArr.map((date) => {
      let found = timeZeroed.find(
        (element: any) => element.date.getTime() === date.getTime()
      )

      if (found) {
        return found.count
      } else {
        return 0
      }
    })

    const dateLabelsArr = allDatesArr.map((date) => formatDateToDDMMMYYYY(date))

    const _result = {
      dateLabels: dateLabelsArr,
      counts: countArr,
      volumes: volumeArr,
    }

    return _result
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const _from = searchParams.get('from')
  const _to = searchParams.get('to')

  if (_from === null || _to === null) {
    return NextResponse.json(
      { error: 'Bad Request! "from" and "to" query params needed.' },
      { status: 400 }
    )
  }

  let fromDate = new Date(_from)
  let toDate = new Date(_to)
  let result = await getChiknSalesByDate(fromDate, toDate)

  return NextResponse.json({ data: result })
}
