import getDb from '@/utils/database'
import { formatDateToDDMMMYYYY, getDatesArray } from '@/utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

const collName: string = 'chikn-sales'

const getChiknSalesByDate = async (from: Date, to: Date) => {
  try {
    const db = await getDb()

    // console.log(from, to)

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

    // console.dir(result, { maxArrayLength: null })

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

    // console.dir(timeZeroed, { maxArrayLength: null })

    const allDatesArr = getDatesArray(from, to)

    // console.dir(allDatesArr, { maxArrayLength: null })

    const volumeArr = allDatesArr.map((date) => {
      let found = timeZeroed.find(
        (element: any) => element.date.getTime() === date.getTime()
      )

      if (found) {
        return found.volumeAVAX
      } else {
        // console.log('NOT FOUND:', found)
        return 0
      }
    })

    // console.dir(volumeArr, { maxArrayLength: null })

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

    // console.log(dateLabelsArr.length)
    const _result = {
      dateLabels: dateLabelsArr,
      counts: countArr,
      volumes: volumeArr,
    }

    // console.log(_result)

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
