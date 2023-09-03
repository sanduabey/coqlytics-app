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
  resorceSummary: {
    avaxium: number
    darkMatter: number
    gold: number
    liquidium: number
    lumber: number
    mana: number
    mech: number
    stone: number
    tungsten: number
    veg: number
    nonEmpty: number
    empty: number
  }
}

// type TileType = {
//   tile: string
//   variant: string
//   resource: {
//     name: string
//     bonus: number
//   }
//   percentile: number
//   score: number
//   rarity: string
// }

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

  console.log(minSize)
  //min size filter
  if (minSize.trim() !== 'NA') {
    let sizeFilteredResults = farmlandsForSale.filter(
      (farm) => Number(farm.size) >= Number(minSize)
    )
    farmlandsForSale = sizeFilteredResults
  }

  //create resource summary
  for (let i = 0; i < farmlandsForSale.length; i++) {
    // console.log('INSIDE FOR LOOP', i)
    let resourceSummary = {
      avaxium: 0,
      darkMatter: 0,
      gold: 0,
      liquidium: 0,
      lumber: 0,
      mana: 0,
      mech: 0,
      stone: 0,
      tungsten: 0,
      veg: 0,
      nonEmpty: 0,
      empty: 1,
    }

    let farm = farmlandsForSale[i]

    for (let j = 0; j < farm.tiles.length; j++) {
      let tile: any = farm.tiles[j]
      let resource = tile.resource.name

      switch (resource) {
        case 'None':
          resourceSummary.empty += 1
          break

        case 'Avaxium':
          resourceSummary.avaxium += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Dark Matter':
          resourceSummary.darkMatter += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Gold':
          resourceSummary.gold += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Liquidium':
          resourceSummary.liquidium += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Lumber':
          resourceSummary.lumber += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Mana':
          resourceSummary.mana += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Mech':
          resourceSummary.mech += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Stone':
          resourceSummary.stone += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Tungsten':
          resourceSummary.tungsten += 1
          resourceSummary.nonEmpty += 1
          break

        case 'Veg':
          resourceSummary.veg += 1
          resourceSummary.nonEmpty += 1
          break
      }
    }

    // console.log(farm.token, tileSummary)
    farmlandsForSale[i].resorceSummary = resourceSummary
  }

  //tile type filter : WIP

  switch (filterTileType) {
    case 'nonEmpty':
      farmlandsForSale = farmlandsForSale.filter(
        (farm) => farm.resorceSummary.nonEmpty >= Number(minFilterTileTypeCount)
      )
      break

    case 'empty':
      farmlandsForSale = farmlandsForSale.filter(
        (farm) => farm.resorceSummary.empty >= Number(minFilterTileTypeCount)
      )
      break
  }

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
