import getDb from './database'
import { formatDateToDDMMMYYYY, getDatesArray } from './helpers'

const collName: string = 'bp-sales'

export const getBlueprintSalesByDate = async (from: Date, to: Date) => {
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
            // token_id: 1,
            soldPrice: { $multiply: [{ $toDouble: '$value' }, 1e-18] },
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
            volumeAVAX: { $sum: '$soldPrice' },
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
