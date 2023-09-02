import { NextRequest, NextResponse } from 'next/server'

const getBestFarmlandsForSale = async () => {
  const projections: string[] = [
    'token',
    'previousPrice',
    'salePrice',
    'multiplier',
    'bigness',
    'score',
    'size',
    'rarity',
    'tiles',
  ]

  let fetchURL =
    `https://api.chikn.farm/api/farmland/list?page=1&limit=16&filter=forSale%3Dtrue&projection=` +
    projections.join(`&projection=`)

  // console.log(fetchURL)

  const response = await fetch(fetchURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 30,
    },
  })
  const _response = await response.json()

  // console.dir(_response, { maxArrayLength: null })
  return _response.data
}

export async function GET(request: NextRequest) {
  try {
    let result = await getBestFarmlandsForSale()
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
