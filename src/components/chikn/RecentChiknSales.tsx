import { useCallback, useRef } from 'react'
import SoldChikn from './SoldChikn'
import { useInfiniteQuery } from 'react-query'

type chiknSaleDoc = {
  id: string
  chiknId: number
  price: number
  kg: number
  soldAt: string
  tokenId: number
}
async function getChiknSales(pageNumber: number) {
  const response = await fetch(
    `http://localhost:3000/api/chikn-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch chikn data')
  }
  const _response = await response.json()
  return _response.data
}

const ChiknsSold = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    'chiknsales',
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

  if (status === 'error')
    return <p className="center">Error : {error?.message}</p>

  const chiknSalesContent = data?.pages.map((page) => {
    return page.map((item: chiknSaleDoc, index: number) => {
      if (index === page.length - 1) {
        return (
          <SoldChikn
            ref={lastSoldItemRef}
            key={item.id}
            image={`https://api.chikn.farm/api/chikn/thumb/${item.chiknId}`}
            tokenId={item.chiknId}
            price={item.price}
            kg={item.kg}
            soldAt={item.soldAt}
          />
        )
      }
      return (
        <SoldChikn
          key={item.id}
          image={`https://api.chikn.farm/api/chikn/thumb/${item.chiknId}`}
          tokenId={item.chiknId}
          price={item.price}
          kg={item.kg}
          soldAt={item.soldAt}
        />
      )
    })
  })

  return <ul className="p-3"> {chiknSalesContent} </ul>
}

export default ChiknsSold
