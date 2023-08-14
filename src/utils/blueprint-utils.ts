import getDb from './database'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
const axios = require('axios')
import { formatDateToDDMMMYYYY, getDatesArray } from './helpers'

//Blueprints
const nft: string = 'BluePrint'
const collName: string = 'bp-sales'
const address: string = process.env.BLUEPRINT_CONTRACT_ADDRESS as string

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

let skipCount: number = 0
const maxSkipsToBreak: number = 10

export const startBlueprintDataCron = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  })

  console.log(`Initiating download of ${nft} sales data from  ${address}`)

  const chain = EvmChain.AVALANCHE

  let cursor: any = undefined
  let loopCount: number = 0
  let soldCount: number = 0
  // let toBlock:number = 25676100;

  while (true) {
    loopCount++
    console.log(`Loop # ${loopCount}`)

    const response = await Moralis.EvmApi.nft.getNFTContractTransfers({
      address,
      chain,
      cursor: cursor,
      limit: 100,
      // 'toBlock': toBlock,
    })

    let transfers = response.toJSON()
    // console.log(transfers);

    let pagesize: number = Number(transfers.page_size)

    let nftTranferCount: number = 0

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
      nftTranferCount++

      // console.log(`NFT transfer # ${nftTranferCount} count in Loop ${loopCount}`);
      // console.log(transfers.result[i]);

      let tokenId = transfers.result[i].token_id
      let valueSold: any = Number(transfers.result[i].value) * 1e-18 //converted to AVAX

      let nftMetaDataResponse = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
      })
      let nftMetaData: any = nftMetaDataResponse?.toJSON()

      // console.log(nftMetaData);

      if (nftMetaData) {
        let tokenUri = nftMetaData?.token_uri

        // console.log(`TokenURI: ${tokenUri}`);
        // console.log(nftMetaData);

        try {
          let nftDataRes = await axios.get(tokenUri)

          soldCount++

          console.log(
            `${soldCount}) Sold ${nftDataRes.data.name} ${nft} for ${valueSold} AVAX on ${transfers.result[i].block_timestamp}`
          )

          let transferData: any = transfers.result[i]

          //renaming key of metadata object
          nftMetaData['block_number_metadata'] = nftMetaData['block_number']
          delete nftMetaData['block_number']

          let nftData: any = nftDataRes.data

          let docToSave = {
            ...transferData,
            ...nftMetaData,
            ...nftData,
            collectedAt: new Date(),
          }

          // console.log(docToSave);

          let result = await saveSaleToDb(docToSave)

          // break for loop
          if (result === 'MAX_SKIP_REACHED') {
            console.log(
              `Max skip depth ${maxSkipsToBreak} reached. Breaking FOR loop.`
            )
            break
          }
        } catch (error: any) {
          //handle errors
          console.log(`Error hitting ${error.host}`)
          // throw error;
        }
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

async function saveSaleToDb(nftTransferData: any) {
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
