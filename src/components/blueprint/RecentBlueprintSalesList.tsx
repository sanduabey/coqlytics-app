import { useCallback, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import SoldBlueprint from './SoldBlueprint'

type BlueprintSaleDoc = {
  id: string
  tokenId: string
  name: string
  description: string
  price: number
  soldAt: string
  thumbnail: string
  properties: {
    token: string
    base: string
    index: string
    usage: number
    maximumUsage: number
    resourceCost: Object
    itemTier: string
    itemLimit: number
  }
}
async function getBlueprintSales(pageNumber: number) {
  const response = await fetch(
    `${process.env.HOST}/api/blueprint/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Blueprint data')
  }
  const _response = await response.json()
  return _response.data
}

const RecentBlueprintSalesList = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ['farmlandsales'],
    ({ pageParam = 0 }) => getBlueprintSales(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
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

  const blueprintSalesContent = data?.pages.map((page) => {
    return page.map((item: BlueprintSaleDoc, index: number) => {
      let urlPartsArray = item.thumbnail.split('/')
      let urlLastPart = urlPartsArray[urlPartsArray.length - 1].slice(-4)

      const soldBlueprintData = {
        image: item.thumbnail,
        tokenId: item.tokenId,
        price: Math.round(item.price * 100) / 100,
        soldAt: item.soldAt,
        name: item.name,
        description: item.description,
        url: `https://chikn.farm/blueprint/${item.properties.base}_${item.properties.token}_${urlLastPart}`,
        tier: item.properties.itemTier,
      }

      if (index === page.length - 1) {
        return (
          <SoldBlueprint
            ref={lastSoldItemRef}
            key={item.id}
            soldBlueprintData={soldBlueprintData}
          />
        )
      }
      return (
        <SoldBlueprint key={item.id} soldBlueprintData={soldBlueprintData} />
      )
    })
  })

  return <ul className="p-3"> {blueprintSalesContent} </ul>
}

export default RecentBlueprintSalesList
