import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import Moralis from 'moralis'
// import { EvmAddress } from '@moralisweb3/common-evm-utils'

type ChiknForSaleType = {
  token: number
  kg: number
  salePrice: number
  eggPerDay: number
  eggPerDayInAVAX: number
  lastClaimedEgg: Date
  feedAccumulated: number
  feedAccumulatedInAVAX: number
  unclaimedEgg: number
  unclaimedEggInAVAX: number
  baseChiknValueInAVAX: number
  AVAXperKG: number
  daysToBreakEvenFullValue: number
  daysToBreakEvenBaseValue: number
  head: string
  neck: string
  torso: string
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

const getBestVauleChikensForSale = async (sort: string, maxPrice: string) => {
  //get feedburned array from db
  try {
    const db = await getDb()

    const feedBurnedArrayRes = await db
      .collection('configs')
      .findOne({ key: 'cumalativeFEEDBurnedAtChiknKG' })

    if (feedBurnedArrayRes === null) {
      throw { error: 'FeedBurned Array could not be retrieved' }
    }
    const FEED_BURNED_PER_KG = feedBurnedArrayRes.value

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
      next: {
        revalidate: 30,
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
      let lastClaimedEgg = new Date()
      if (chiknsForSale[i].lastClaimedEgg !== null) {
        lastClaimedEgg = new Date(chiknsForSale[i].lastClaimedEgg)
      } else {
        lastClaimedEgg = new Date('11/12/2021') //chikn mint date
      }
      let diffTime = now.getTime() - lastClaimedEgg.getTime()
      let diffDays = diffTime / (1000 * 3600 * 24)

      let unclaimedEgg = diffDays * chiknsForSale[i].eggPerDay
      chiknsForSale[i].unclaimedEgg = unclaimedEgg
      chiknsForSale[i].unclaimedEggInAVAX = unclaimedEgg * eggPriceInAVAX

      //eggPerDayInAVAX
      chiknsForSale[i].eggPerDayInAVAX =
        chiknsForSale[i].eggPerDay * eggPriceInAVAX

      // balanceChiknValue
      chiknsForSale[i].baseChiknValueInAVAX =
        chiknsForSale[i].salePrice -
        chiknsForSale[i].feedAccumulatedInAVAX -
        chiknsForSale[i].unclaimedEggInAVAX

      //daysToBreakeven
      chiknsForSale[i].daysToBreakEvenFullValue =
        chiknsForSale[i].salePrice / chiknsForSale[i].eggPerDayInAVAX
      chiknsForSale[i].daysToBreakEvenBaseValue =
        chiknsForSale[i].baseChiknValueInAVAX / chiknsForSale[i].eggPerDayInAVAX

      chiknsForSale[i].AVAXperKG =
        chiknsForSale[i].salePrice / chiknsForSale[i].kg
      // console.log(chiknsForSale[i])
    }
  } catch (error) {
    throw error
  }

  // max price filter
  if (maxPrice !== 'any') {
    let filteredResults = chiknsForSale.filter(
      (chikn) => chikn.salePrice <= Number(maxPrice)
    )
    chiknsForSale = filteredResults
  }

  // console.log('SORT ', sort)
  // sort
  switch (sort) {
    case 'chiknBaseValue':
      chiknsForSale.sort((a, b) =>
        a.baseChiknValueInAVAX > b.baseChiknValueInAVAX ? 1 : -1
      )
      break
    case 'unclaimedEGG':
      chiknsForSale.sort((a, b) => (a.unclaimedEgg > b.unclaimedEgg ? -1 : 1))
      break

    case 'AVAXperKG':
      chiknsForSale.sort((a, b) => (a.AVAXperKG > b.AVAXperKG ? 1 : -1))
      break
    case 'breakevenFullValue':
      chiknsForSale.sort((a, b) =>
        a.daysToBreakEvenFullValue > b.daysToBreakEvenFullValue ? 1 : -1
      )
      break
    case 'breakevenBaseValue':
      chiknsForSale.sort((a, b) =>
        a.daysToBreakEvenBaseValue > b.daysToBreakEvenBaseValue ? 1 : -1
      )
      break
  }

  //slite first 100 items
  let best100ChiknForSale = chiknsForSale.slice(0, 25)
  // console.log(best100ChiknForSale.length)

  // console.log('RESULT', best100ChiknForSale)
  return best100ChiknForSale
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sort: string | null = searchParams.get('sort')
  const maxPrice: string | null = searchParams.get('maxPrice')

  if (sort === null || maxPrice === null) {
    return NextResponse.json(
      {
        error: 'Bad Request! query parameters (sort , maxPrice) cannot be null',
      },
      { status: 400 }
    )
  }

  try {
    let result = await getBestVauleChikensForSale(sort, maxPrice)
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
