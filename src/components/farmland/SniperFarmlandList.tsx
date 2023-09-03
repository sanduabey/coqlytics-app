import { useQuery } from '@tanstack/react-query'
import ForSaleFarmland from './ForSaleFarmland'

type SniperFarmlandListPropsType = {
  sortStrategy: string
  maxPriceAVAX: string
  minSize: string
  filterTileType: string
  minFilterTileTypeCount: number
}

type FarmlandForSaleType = {
  token: number
  previousePrice: number
  salePrice: number
  multiplier: number
  bigness: string
  score: number
  size: string
  rarity: string
  tiles: Object[]
}

const getBestForSaleFarmlands = async (
  sortStrategy: string,
  maxPriceAVAX: string,
  minSize: string,
  filterTileType: string,
  minFilterTileTypeCount: number
) => {
  const response = await fetch(
    `${process.env.HOST}/api/farmland/sniper?sort=${sortStrategy}&maxPrice=${maxPriceAVAX}&minSize=${minSize}
    &filterTileType=${filterTileType}&minFilterTileTypeCount=${minFilterTileTypeCount}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch best for sale Farmlands')
  }

  const _response = await response.json()

  // console.log(_response)

  return _response.data
}

const SniperFarmlandList = (props: SniperFarmlandListPropsType) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [
      'farmlandSniper',
      props.sortStrategy,
      props.maxPriceAVAX,
      props.minSize,
      props.filterTileType,
      props.minFilterTileTypeCount,
    ],
    queryFn: () =>
      getBestForSaleFarmlands(
        props.sortStrategy,
        props.maxPriceAVAX,
        props.minSize,
        props.filterTileType,
        props.minFilterTileTypeCount
      ),
  })

  if (isError) return <div>failed to load</div>
  if (isLoading)
    return <div className="flex justify-center text-white p-6">loading...</div>

  const forSaleFarmlandContent = data.map(
    (item: FarmlandForSaleType, index: number) => {
      const forSaleFarmlandData = {
        index: index + 1,
        image: `https://api.chikn.farm/api/farmland/thumb/${item.token}`,
        tokenId: item.token,
        price: item.salePrice,
        previousePrice: item.previousePrice,
        multiplier: item.multiplier,
        bigness: item.bigness,
        score: item.score,
        size: item.size,
        rarity: item.rarity,
        tiles: item.tiles,
      }

      return (
        <ForSaleFarmland key={item.token} farmlandData={forSaleFarmlandData} />
      )
    }
  )

  return <ul className="p-3">{forSaleFarmlandContent}</ul>
}

export default SniperFarmlandList
