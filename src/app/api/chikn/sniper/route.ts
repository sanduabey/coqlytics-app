import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import Moralis from 'moralis'
import { EvmAddress } from '@moralisweb3/common-evm-utils'

type ChiknForSaleType = {
  token: number
  kg: number
  salePrice: number
  eggPerDay: number
  lastClaimedEgg: Date
  feedBurned: number
  unclaimedEgg: number
}

const EGG_CONTRACT: string | undefined = process.env.EGG_CONTRACT_ADDRESS
const FEED_CONTRACT: string | undefined = process.env.FEED_CONTRACT_ADDRESS

const getBestVauleChikensForSale = async () => {
  const response = await fetch(
    'https://api.chikn.farm/api/chikn/list?page=1&limit=16&filter=forSale=true&projection=token&projection=kg&projection=salePrice&projection=eggPerDay&projection=lastClaimedEgg',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const _response = await response.json()

  let chiknsForSale: ChiknForSaleType[] = _response.data

  //get feedburned array from db
  try {
    const db = await getDb()

    const FEED_BURNED_PER_KG = await db
      .collection('configs')
      .findOne({ key: 'cumalativeFEEDBurnedAtChiknKG' })

    console.log(FEED_BURNED_PER_KG)

    //get feed/AVAX and egg/AVAX prices
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })

    if (EGG_CONTRACT !== undefined) {
      const eggPriceRes = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0xa86a', //avalance
        exchange: 'traderjoe',
        address: EGG_CONTRACT,
      })
      console.log('EGG', eggPriceRes.raw)
    }

    if (FEED_CONTRACT !== undefined) {
      const feedPriceRes = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0xa86a', //avalance
        exchange: 'traderjoe',
        address: FEED_CONTRACT,
      })
      console.log('FEED', feedPriceRes.raw)
    }
  } catch (error) {
    throw error
  }

  //calculate feed burned and egg unclaimed and in AVAX, also chiknRealValue in AVAX
  for (let i = 0; i < chiknsForSale.length; i++) {}

  //sort

  // console.log(chiknsForSale)
  return chiknsForSale
}

export async function GET(request: NextRequest) {
  let result = await getBestVauleChikensForSale()

  return NextResponse.json({ data: result })
}
