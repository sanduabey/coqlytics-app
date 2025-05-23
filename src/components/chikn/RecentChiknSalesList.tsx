import { useCallback, useRef } from 'react'
import SoldChikn from './SoldChikn'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

type chiknSaleDoc = {
  id: string
  chiknId: number
  price: number
  kg: number
  soldAt: string
  tokenId: number
  rarity: string
  rank: string
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
    `${process.env.HOST}/api/chikn/recent-sales?pageNo=${pageNumber}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch chikn data')
  }
  const _response = await response.json()
  return _response.data
}

const getChiknPriceBoundary = async () => {
  const response = await fetch(`${process.env.HOST}/api/chikn/price-boundary`)

  if (!response.ok) {
    throw new Error('Failed to fetch price boundary')
  }

  const _response = await response.json()

  return _response.data
}

const RecentChiknSalesList = () => {
  //query price boundary

  const boundaryResponse = useQuery({
    queryKey: ['chiknPriceBoundary'],
    queryFn: () => getChiknPriceBoundary(),
  })

  // if (boundaryResponse.isError) return <div>failed to load boundary</div>
  // if (boundaryResponse.isLoading) return <div>loading boundary...</div>

  //query recent chikn sales
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

  const chiknSalesContent = data?.pages.map((page) => {
    return page.map((item: chiknSaleDoc, index: number) => {
      //Rarity first letter capitalization
      const rarityWord = item.rarity
      const firstLetter = rarityWord.charAt(0)
      const firstLetterCap = firstLetter.toUpperCase()
      const remainingLetters = rarityWord.slice(1)
      const capitalizedRarityWord = firstLetterCap + remainingLetters

      const soldChiknData = {
        image: `https://api.chikn.farm/api/chikn/thumb/${item.chiknId}`,
        tokenId: item.chiknId,
        price: Math.round(item.price * 100) / 100,
        kg: item.kg,
        soldAt: item.soldAt,
        rarity: capitalizedRarityWord,
        rank: item.rank,
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
            priceBoundary={boundaryResponse.data}
          />
        )
      }
      return (
        <SoldChikn
          key={item.id}
          soldChiknData={soldChiknData}
          priceBoundary={boundaryResponse.data}
        />
      )
    })
  })

  return <ul className="p-3"> {chiknSalesContent} </ul>
}

export default RecentChiknSalesList
