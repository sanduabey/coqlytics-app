import getDb from './database'
import { formatNumber } from './helpers'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

const address: string = process.env.COQ_CONTRACT_ADDRESS as string
const collName: string = 'coq-txns'

let skipCount: number = 0
const maxSkipsToBreak: number = 100

export const startCoqDataCron = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  })

  console.log(`Initiating download $Coq Txns data from  ${address}`)

  const chain = EvmChain.AVALANCHE

  let cursor: any = undefined
  let loopCount: number = 0
  let txnCount: number = 0
  let toBlock: number = 38932984 // 39851503
  //add min block number from db toBlock to start from that block

  while (true) {
    loopCount++
    console.log(`Loop # ${loopCount}`)

    let response = await Moralis.EvmApi.token.getTokenTransfers({
      address,
      chain,
      cursor: cursor,
      limit: 100,
      // toBlock: toBlock,
    })

    let txns = response.toJSON()
    // console.log(txns)

    // process.exit(1)

    let pagesize: number = Number(txns.page_size)

    type coqPriceType = {
      tokenName?: string
      tokenSymbol?: string
      nativePrice?: {
        value?: string
      }
      usdPrice?: number
      toBlock?: string
    }

    let lastCoqPrice: coqPriceType | undefined = undefined

    for (let i = 0; i < pagesize; i++) {
      //if value is 0, its a nft mint event. skip..
      // console.log(transfers.result[i]);
      if (
        txns.result == undefined ||
        txns.result[i] == undefined ||
        txns.result[i].value == '0'
      ) {
        // console.log(`Skipping..`);
        continue
      }
      txnCount++

      let txnData: any = txns.result[i]

      // console.log('TXN:', txnData)

      let qtySold: any = Number(txns.result[i].value) * 1e-18 //in $Coq

      let formattedQtySold: string = formatNumber(qtySold, 2)

      try {
        let coqPrice: coqPriceType

        if (!lastCoqPrice || lastCoqPrice.toBlock !== txnData.block_number) {
          let priceDataRes = await Moralis.EvmApi.token.getTokenPrice({
            address,
            chain,
            toBlock: txnData.block_number,
          })

          coqPrice = priceDataRes.toJSON()
          lastCoqPrice = coqPrice
        } else {
          coqPrice = lastCoqPrice
        }

        let valueAVAX: number =
          Number(txnData.value) *
          1e-18 *
          Number(coqPrice.nativePrice?.value) *
          1e-18

        let valueUSD: number =
          Number(txnData.value) * 1e-18 * Number(coqPrice.usdPrice)
        // console.log('coqPriceRes:', coqPrice)

        console.log(
          `${txnCount}) ${formattedQtySold} $COQ @ ${valueAVAX.toFixed(
            2
          )} AVAX (${valueUSD.toFixed(2)} USD) on ${
            txns.result[i].block_timestamp
          } - block #: ${txnData.block_number}`
        )

        let docToSave = {
          ...txnData,
          coqPrice,
          valueAVAX,
          valueUSD,
          collectedAt: new Date(),
        }

        // console.log(docToSave);

        let result = await saveTxnToDb(docToSave)

        //break for loop
        if (result === 'MAX_SKIP_REACHED') {
          console.log(
            `Max skip depth ${maxSkipsToBreak} reached. Breaking FOR loop.`
          )
          break
        }
      } catch (error) {
        // console.log(error)
        // throw error
      }
    }

    cursor = txns.cursor

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

const saveTxnToDb = async (txnData: any) => {
  try {
    const db = await getDb()
    let doc = await db
      .collection(collName)
      .findOne({ transaction_hash: txnData.transaction_hash })

    if (doc) {
      skipCount++
      console.log(`record found : ${doc._id}, skipping..`)

      if (skipCount >= maxSkipsToBreak) {
        return 'MAX_SKIP_REACHED'
      }
      return 'SKIPPED'
    } else {
      let result = await db.collection(collName).insertOne(txnData)
      skipCount = 0
      console.log(`Savedddd. ${result.insertedId}`)
      return 'SAVED'
    }
  } catch (error) {
    throw error
  }
}
