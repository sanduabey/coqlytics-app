import { useCallback, useRef } from 'react'
import SoldChikn from './SoldChikn'
import { useInfiniteQuery } from '@tanstack/react-query'

type chiknSaleDoc = {
  id: string
  chiknId: number
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
async function getChiknSales(pageNumber: number) {
  const response = await fetch(
    `http://localhost:3000/api/chikn/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch chikn data')
  }
  const _response = await response.json()
  return _response.data
}

const RecentChiknSales = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ['chiknsales'],
    ({ pageParam = 0 }) => getChiknSales(pageParam),
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

  const chiknSalesContent = data?.pages.map((page) => {
    return page.map((item: chiknSaleDoc, index: number) => {
      const soldChiknData = {
        image: `https://api.chikn.farm/api/chikn/thumb/${item.chiknId}`,
        tokenId: item.chiknId,
        price: item.price,
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
          <SoldChikn
            ref={lastSoldItemRef}
            key={item.id}
            soldChiknData={soldChiknData}
          />
        )
      }
      return <SoldChikn key={item.id} soldChiknData={soldChiknData} />
    })
  })

  return <ul className="p-3"> {chiknSalesContent} </ul>
}

export default RecentChiknSales
