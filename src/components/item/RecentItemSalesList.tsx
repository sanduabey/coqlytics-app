import { useCallback, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import SoldItem from './SoldItem'

type ItemSaleDoc = {
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
async function getItemSales(pageNumber: number) {
  const response = await fetch(
    `${process.env.HOST}/api/item/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Items data')
  }
  const _response = await response.json()
  return _response.data
}

const RecentItemSalesList = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ['itemsales'],
    ({ pageParam = 0 }) => getItemSales(pageParam),
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

  const itemSalesContent = data?.pages.map((page) => {
    return page.map((item: ItemSaleDoc, index: number) => {
      const soldItemData = {
        image: item.thumbnail,
        tokenId: item.tokenId,
        price: Math.round(item.price * 100) / 100,
        soldAt: item.soldAt,
        name: item.name,
        description: item.description,
        tier: item.properties.itemTier,
        usage: item.properties.usage,
        maxUsage: item.properties.maximumUsage,
      }

      if (index === page.length - 1) {
        return (
          <SoldItem
            ref={lastSoldItemRef}
            key={item.id}
            soldItemData={soldItemData}
          />
        )
      }
      return <SoldItem key={item.id} soldItemData={soldItemData} />
    })
  })

  return <ul className="p-3"> {itemSalesContent} </ul>
}

export default RecentItemSalesList
