import getDb from './database'
import { formatDateToDDMMMYYYY, getDatesArray } from './helpers'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
// require('dotenv').config()
const axios = require('axios')

//Chikn
const nft: string = 'Chikn'
const collName: string = 'chikn-sales'
const nftDataAPIURI: string = 'https://api.chikn.farm/api/chikn/details'
const address: string = process.env.CHIKN_CONTRACT_ADDRESS as string

export const getChiknSalesByDate = async (from: Date, to: Date) => {
  try {
    const db = await getDb()

    // console.log(from, to)

    const result = await db
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

let skipCount: number = 0
const maxSkipsToBreak: number = 10

export const startChiknDataCron = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  })

  console.log(`Initiating download of ${nft} sales data from  ${address}`)

  const chain = EvmChain.AVALANCHE

  let cursor: any = undefined
  let loopCount: number = 0
  let soldCount: number = 0
  // let toBlock:number = 13469922;
  //add min block number from db toBlock to start from that block

  while (true) {
    loopCount++
    console.log(`Loop # ${loopCount}`)

    let response = await Moralis.EvmApi.nft.getNFTContractTransfers({
      address,
      chain,
      cursor: cursor,
      limit: 100,
      // 'toBlock': toBlock,
    })

    let transfers = response.toJSON()
    // console.log(transfers);

    let pagesize: number = Number(transfers.page_size)

    for (let i = 0; i < pagesize; i++) {
      //if value is 0, its a nft mint event. skip..
      // console.log(transfers.result[i]);
      if (
        transfers.result[i] == undefined ||
        transfers.result[i].value == '0'
      ) {
        // console.log(`Skipping..`);
        continue
      }
      soldCount++

      let transferData: any = transfers.result[i]
      let valueSold: any = Number(transfers.result[i].value) * 1e-18 //converted to AVAX

      // console.log(transfers.result[i]);
      // if (nft == "Roostr") valueSold = transfers.result[i].salePrice;

      try {
        let nftDataRes = await axios.get(
          `${nftDataAPIURI}/${transfers.result[i].token_id}`
        )

        let nftData = nftDataRes.data
        // console.log(nftData);

        let docToSave = { ...transferData, ...nftData, collectedAt: new Date() }

        console.log(
          `${soldCount}) ${nft} #${nftData.token} (${nftData.kg}kg - ${nftData.rarity}) sold for ${valueSold} AVAX on ${transfers.result[i].block_timestamp}`
        )

        // console.log(docToSave);

        let result = await saveSaleToDb(docToSave)

        //break for loop
        if (result === 'MAX_SKIP_REACHED') {
          console.log(
            `Max skip depth ${maxSkipsToBreak} reached. Breaking FOR loop.`
          )
          break
        }
      } catch (error) {
        throw error
      }
    }

    cursor = transfers.cursor

    //BREAKING WHILE LOOP
    if (cursor == null) {
      console.log(`All NFT transfered collected. Breaking WHILE loop.`)
      break
    }
    if (skipCount >= maxSkipsToBreak) {
      console.log(
        `Max skip depth ${maxSkipsToBreak} reached. Breaking WHILE loop.`
      )
      break
    }
  }

  console.log('DONE')
  return 'DONE'
}

const saveSaleToDb = async (nftTransferData: any) => {
  try {
    const db = await getDb()
    let doc = await db
      .collection(collName)
      .findOne({ transaction_hash: nftTransferData.transaction_hash })

    if (doc) {
      skipCount++
      console.log(`record found : ${doc._id}, skipping..`)

      if (skipCount >= maxSkipsToBreak) {
        return 'MAX_SKIP_REACHED'
      }
      return 'SKIPPED'
    } else {
      let result = await db.collection(collName).insertOne(nftTransferData)
      skipCount = 0
      console.log(`Savedddd. ${result.insertedId}`)
      return 'SAVED'
    }
  } catch (error) {
    throw error
  }
}

export const getLastNDaysChiknSalePrices = async (nDays: number) => {
  let toDate = new Date()
  let fromDate = new Date()
  fromDate.setDate(toDate.getDate() - nDays)

  // console.log('HERE', fromDate, toDate)

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

            soldPrice: { $multiply: [{ $toDouble: '$value' }, 1e-18] },
          },
        },
        {
          $match: {
            $and: [
              {
                block_timestamp: { $lte: toDate },
              },
              {
                block_timestamp: { $gte: fromDate },
              },
            ],
          },
        },
      ])
      .toArray()

    // console.log(result)

    let priceArray = result.map((sold: any) => sold.soldPrice)

    // console.log(priceArray)

    return priceArray
  } catch (error) {
    throw error
  }
}
