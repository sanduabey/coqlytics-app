import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import Moralis from 'moralis'
// import { EvmAddress } from '@moralisweb3/common-evm-utils'

type ChiknForSaleType = {
  token: number
  kg: number
  salePrice: number
  eggPerDay: number
  lastClaimedEgg: Date
  feedAccumulated: number
  feedAccumulatedInAVAX: number
  unclaimedEgg: number
  unclaimedEggInAVAX: number
  balanceChiknValueInAVAX: number
  head: string
  neck: string
  torse: string
  feet: string
  tail: string
  body: string
  trim: string
  background: string
  _numOfTraits: number
  rank: string
  rarity: string
  score: number
}

const EGG_CONTRACT: string | undefined = process.env.EGG_CONTRACT_ADDRESS
const FEED_CONTRACT: string | undefined = process.env.FEED_CONTRACT_ADDRESS

type TokenPriceType = {
  tokenName?: string | undefined
  tokenSymbol?: string | undefined
  tokenDecimals?: string | undefined
  nativePrice?:
    | {
        value: string
        decimals: number
        name: string
        symbol: string
        address: string
      }
    | undefined
  usdPrice: number | undefined
  usdPriceFormatted?: string | undefined
  exchangeAddress?: string | undefined
  exchangeName?: string | undefined
  tokenAddress?: string | undefined
}

let eggPriceObj: TokenPriceType
let feedPriceObj: TokenPriceType

let feedPriceInAVAX: number
let eggPriceInAVAX: number

let chiknsForSale: ChiknForSaleType[]

let MoralisConn: any = null

const getBestVauleChikensForSale = async () => {
  //get feedburned array from db
  try {
    const db = await getDb()

    const feedBurnedArrayRes = await db
      .collection('configs')
      .findOne({ key: 'cumalativeFEEDBurnedAtChiknKG' })

    const FEED_BURNED_PER_KG = feedBurnedArrayRes.value

    // console.log(FEED_BURNED_PER_KG)

    //get feed/AVAX and egg/AVAX prices
    if (MoralisConn === null) {
      MoralisConn = await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      })
    }

    if (EGG_CONTRACT !== undefined) {
      const eggPriceRes = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0xa86a', //avalance
        exchange: 'traderjoe',
        address: EGG_CONTRACT,
      })
      // console.log('EGG', eggPriceRes.raw)

      eggPriceObj = eggPriceRes.raw
      eggPriceInAVAX = Number(eggPriceObj.nativePrice?.value) * 1e-18 //convert to AVAX
    }

    if (FEED_CONTRACT !== undefined) {
      const feedPriceRes = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0xa86a', //avalance
        exchange: 'traderjoe',
        address: FEED_CONTRACT,
      })
      // console.log('FEED', feedPriceRes.raw)

      feedPriceObj = feedPriceRes.raw
      feedPriceInAVAX = Number(feedPriceObj.nativePrice?.value) * 1e-18 //convert to AVAX
    }

    //get chikns for sale

    const projections: string[] = [
      'token',
      'kg',
      'salePrice',
      'eggPerDay',
      'lastClaimedEgg',
      'head',
      'neck',
      'torso',
      'feet',
      'tail',
      'body',
      'trim',
      'background',
      '_numOfTraits',
      'rank',
      'rarity',
      'score',
    ]
    let fetchURL =
      'https://api.chikn.farm/api/chikn/list?page=1&limit=1000&filter=forSale%3Dtrue' +
      '&projection=' +
      projections.join('&projection=')

    // console.log('URL:', fetchURL)

    const response = await fetch(fetchURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const _response = await response.json()
    chiknsForSale = _response.data

    //calculate feed burned and egg unclaimed and in AVAX, also chiknRealValue in AVAX
    for (let i = 0; i < chiknsForSale.length; i++) {
      //feed burned
      let feedBurned = FEED_BURNED_PER_KG[chiknsForSale[i].kg]
      chiknsForSale[i].feedAccumulated = feedBurned
      chiknsForSale[i].feedAccumulatedInAVAX = feedBurned * feedPriceInAVAX

      //egg unclamied
      let now = new Date()
      let lastClaimedEgg = new Date(chiknsForSale[i].lastClaimedEgg)
      let diffTime = now.getTime() - lastClaimedEgg.getTime()
      let diffDays = diffTime / (1000 * 3600 * 24)

      let unclaimedEgg = diffDays * chiknsForSale[i].eggPerDay
      chiknsForSale[i].unclaimedEgg = unclaimedEgg
      chiknsForSale[i].unclaimedEggInAVAX = unclaimedEgg * eggPriceInAVAX

      chiknsForSale[i].balanceChiknValueInAVAX =
        chiknsForSale[i].salePrice -
        chiknsForSale[i].feedAccumulatedInAVAX -
        chiknsForSale[i].unclaimedEggInAVAX

      // console.log(chiknsForSale[i])
    }
  } catch (error) {
    throw error
  }

  //sort
  chiknsForSale.sort((a, b) =>
    a.balanceChiknValueInAVAX > b.balanceChiknValueInAVAX ? 1 : -1
  )

  //slite first 100 items
  let best100ChiknForSale = chiknsForSale.slice(0, 100)
  // console.log(best100ChiknForSale.length)

  // console.log(chiknsForSale)
  return best100ChiknForSale
}

export async function GET(request: NextRequest) {
  let result = await getBestVauleChikensForSale()

  return NextResponse.json({ data: result })
}
