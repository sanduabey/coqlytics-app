import { getBlueprintSalesByDate } from './blueprint-utils'
import { getChiknSalesByDate } from './chikn-utils'
import getDb from './database'
import { getFarmlandSalesByDate } from './farmland-utils'
import { getItemSalesByDate } from './item-utils'
import { getRoostrSalesByDate } from './roostr-utils'

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

const OUTLIER_FACTOR: number = 0.8
export function getOutlierBoundary(array: number[]): {
  minBoundary: number
  maxBoundary: number
} {
  let values = array.concat()

  //sort
  values.sort((a, b) => a - b)

  let q1 = values[Math.floor(values.length / 4)]
  let q3 = values[Math.ceil(values.length * (3 / 4))]

  //inter quartile range
  let iqr = q3 - q1

  let maxValue = q3 + iqr * OUTLIER_FACTOR
  let minValue = q1 - iqr * OUTLIER_FACTOR

  return { minBoundary: minValue, maxBoundary: maxValue }
}

const sleep = async (milliseconds: number) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds)
  })
}

export const getAllCollectionSalesByDate = async (from: Date, to: Date) => {
  try {
    // const chiknSales = await getChiknSalesByDate(from, to)
    // const roostrSales = await getRoostrSalesByDate(from, to)
    // const farmlandSales = await getFarmlandSalesByDate(from, to)
    // const blueprintSales = await getBlueprintSalesByDate(from, to)
    // const itemSales = await getItemSalesByDate(from, to)

    let results = await Promise.all([
      getChiknSalesByDate(from, to),
      getRoostrSalesByDate(from, to),
    ])

    // const results = await Promise.all([getChiknSalesByDate(from, to)])

    console.log(results)

    // const dateLabelsArr = chiknSales.dateLabels

    // let totalVolumeArr = []
    // let totalCountArr = []

    // for (let i = 0; i < dateLabelsArr.length; i++) {
    //   totalVolumeArr[i] =
    //     chiknSales.volumes[i] +
    //     roostrSales.volumes[i] +
    //     farmlandSales.volumes[i] +
    //     blueprintSales.volumes[i] +
    //     itemSales.volumes[i]
    //   totalCountArr[i] =
    //     chiknSales.counts[i] +
    //     roostrSales.counts[i] +
    //     farmlandSales.counts[i] +
    //     blueprintSales.counts[i] +
    //     itemSales.counts[i]
    // }

    // let totalSales = {
    //   dateLabels: dateLabelsArr,
    //   counts: totalCountArr,
    //   volumes: totalVolumeArr,
    // }

    // const result = {
    //   chiknSales,
    //   roostrSales,
    //   farmlandSales,
    //   blueprintSales,
    //   itemSales,
    //   totalSales,
    // }

    return 1
  } catch (error) {
    throw error
  }
}
