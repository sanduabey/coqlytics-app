import { useCallback, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import SoldRoostr from './SoldRoostr'

type roostrSaleDoc = {
  id: string
  roostrId: number
  price: number
  kg: number
  soldAt: string
  tokenId: number
  rarity: string
  head: string
  neck: string
  torso: string
  feet: string
  tail: string
  body: string
  trim: string
  background: string
  numOfTraits: number
}
async function getRoostrSales(pageNumber: number) {
  const response = await fetch(
    `${process.env.HOST}/api/roostr/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Roostr data')
  }
  const _response = await response.json()
  return _response.data
}

const RecentRoostrSalesList = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ['roostrsales'],
    ({ pageParam = 0 }) => getRoostrSales(pageParam),
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

  const roostrSalesContent = data?.pages.map((page) => {
    return page.map((item: roostrSaleDoc, index: number) => {
      const soldRoostrData = {
        image: `https://api.chikn.farm/api/roostr/thumb/${item.roostrId}`,
        tokenId: item.roostrId,
        price: Math.round(item.price * 100) / 100,
        kg: item.kg,
        soldAt: item.soldAt,
        rarity: item.rarity,
        head: item.head,
        neck: item.neck,
        torso: item.torso,
        feet: item.feet,
        tail: item.tail,
        body: item.body,
        trim: item.trim,
        background: item.background,
        numOfTraits: item.numOfTraits,
      }

      if (index === page.length - 1) {
        return (
          <SoldRoostr
            ref={lastSoldItemRef}
            key={item.id}
            soldRoostrData={soldRoostrData}
          />
        )
      }
      return <SoldRoostr key={item.id} soldRoostrData={soldRoostrData} />
    })
  })

  return <ul className="p-3"> {roostrSalesContent} </ul>
}

export default RecentRoostrSalesList
