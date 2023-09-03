import { NextRequest, NextResponse } from 'next/server'

type FarmlandForSaleType = {
  token: number
  previousPrice: number
  salePrice: number
  multiplier: number
  bigness: string
  score: number
  size: string
  rarity: string
  tiles: Object[]
}

let farmlandsForSale: FarmlandForSaleType[]
const getBestFarmlandsForSale = async (
  sort: string,
  maxPrice: string,
  minSize: string,
  filterTileType: string,
  minFilterTileTypeCount: string
) => {
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
    `https://api.chikn.farm/api/farmland/list?page=1&limit=1000&filter=forSale%3Dtrue&projection=` +
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

  farmlandsForSale = _response.data

  // max price filter
  if (maxPrice !== 'any') {
    let filteredResults = farmlandsForSale.filter(
      (farm) => farm.salePrice <= Number(maxPrice)
    )
    farmlandsForSale = filteredResults
  }

  //min size filter
  if (minSize !== 'N/A') {
    let sizeFilteredResults = farmlandsForSale.filter(
      (farm) => Number(farm.size) >= Number(minSize)
    )
    farmlandsForSale = sizeFilteredResults
  }

  //Tile Type Filter

  //sorting
  // console.log(sort)
  switch (sort) {
    case 'lowestPrice':
      farmlandsForSale.sort((a, b) => (a.salePrice > b.salePrice ? 1 : -1))
      break
    case 'highestPrice':
      farmlandsForSale.sort((a, b) => (b.salePrice > a.salePrice ? 1 : -1))
      break
    case 'lowestScore':
      farmlandsForSale.sort((a, b) => (a.score > b.score ? 1 : -1))
      break
    case 'highestScore':
      farmlandsForSale.sort((a, b) => (b.score > a.score ? 1 : -1))
      break
    case 'lowestSize':
      farmlandsForSale.sort((a, b) =>
        Number(a.size) > Number(b.size) ? 1 : -1
      )
      break
    case 'highestSize':
      farmlandsForSale.sort((a, b) =>
        Number(b.size) > Number(a.size) ? 1 : -1
      )
      break
    case 'lowestFertility':
      farmlandsForSale.sort((a, b) => (a.multiplier > b.multiplier ? 1 : -1))
      break
    case 'highestFertility':
      farmlandsForSale.sort((a, b) => (b.multiplier > a.multiplier ? 1 : -1))
      break
  }

  //slite first 100 items
  let bestFarmlandsForSale = farmlandsForSale.slice(0, 100)

  return bestFarmlandsForSale
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sort: string | null = searchParams.get('sort')
  const maxPrice: string | null = searchParams.get('maxPrice')
  const minSize: string | null = searchParams.get('minSize')
  const filterTileType: string | null = searchParams.get('filterTileType')
  const minFilterTileTypeCount: string | null = searchParams.get(
    'minFilterTileTypeCount'
  )

  if (
    sort === null ||
    maxPrice === null ||
    minSize === null ||
    filterTileType === null ||
    minFilterTileTypeCount === null
  ) {
    return NextResponse.json(
      {
        error:
          'Bad Request! query parameters (sort , maxPrice, minSize, filterTileType, minFilterTileTypeCount) cannot be null',
      },
      { status: 400 }
    )
  }

  try {
    let result = await getBestFarmlandsForSale(
      sort,
      maxPrice,
      minSize,
      filterTileType,
      minFilterTileTypeCount
    )
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
