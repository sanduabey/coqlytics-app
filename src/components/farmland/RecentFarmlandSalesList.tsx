import { useCallback, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import SoldFarmland from './SoldFarmland'
// import SoldRoostr from './SoldRoostr'

type FarmlandSaleDoc = {
  id: string
  farmId: number
  price: number
  size: string
  soldAt: string
  tokenId: number
  rarity: string
  bigness: string
  multiplier: number
  score: number
  tiles: Object[]
}
async function getFarmlandSales(pageNumber: number) {
  const response = await fetch(
    `${process.env.HOST}/api/farmland/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Farmland data')
  }
  const _response = await response.json()
  return _response.data
}

const RecentFarmlandSalesList = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ['farmlandsales'],
    ({ pageParam = 0 }) => getFarmlandSales(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined
      },
    }
  )

  const intObserver: any = useRef(null) //Intersection Observer

  const lastSoldItemRef = useCallback(
    (item: any) => {
      if (isFetchingNextPage) return

      if (!item) return
      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          // console.log('We are near the last item.')

          fetchNextPage()
        }
      })
      if (item) intObserver.current.observe(item)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  if (status === 'error') return <p className="center">Error Fetching Data</p>

  const farmlandSalesContent = data?.pages.map((page) => {
    return page.map((item: FarmlandSaleDoc, index: number) => {
      const soldFarmlandData = {
        image: `https://api.chikn.farm/api/farmland/thumb/${item.farmId}`,
        tokenId: item.farmId,
        price: Math.round(item.price * 100) / 100,
        size: item.size,
        soldAt: item.soldAt,
        rarity: item.rarity,
        bigness: item.bigness,
        multiplier: item.multiplier,
        score: Math.round(item.score * 10) / 10,
        tiles: item.tiles,
      }

      if (index === page.length - 1) {
        return (
          <SoldFarmland
            ref={lastSoldItemRef}
            key={item.id}
            soldFarmlandData={soldFarmlandData}
          />
        )
      }
      return <SoldFarmland key={item.id} soldFarmlandData={soldFarmlandData} />
    })
  })

  return <ul className="p-3"> {farmlandSalesContent} </ul>
}

export default RecentFarmlandSalesList
