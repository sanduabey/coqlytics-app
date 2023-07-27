import ForSaleChikn from '@/components/chikn/ForSaleChikn'
import PageHeading from '@/components/util-components/PageHeading'

type ChiknForSaleType = {
  token: number
  kg: number
  salePrice: number
  eggPerDay: number
  lastClaimedEgg: Date
  feedAccumulated: number
  feedAccumulatedInAVAX: number
  unclaimedEgg: number
  unclaimedEggInAVAX: number
  balanceChiknValueInAVAX: number
  head: string
  neck: string
  torso: string
  feet: string
  tail: string
  body: string
  trim: string
  background: string
  _numOfTraits: number
  rank: string
  rarity: string
  score: number
}

const getBestForSaleChikns = async () => {
  const response = await fetch(`${process.env.HOST}/api/chikn/sniper`)

  if (!response.ok) {
    throw new Error('Failed to fetch best for sale Chikns')
  }

  const _response = await response.json()

  // console.log(_response)

  return _response.data
}

export default async function ChiknSniperPage() {
  const forSaleChikns = await getBestForSaleChikns() //STOPPED HERER

  const forSaleChiknContent = forSaleChikns.map((item: ChiknForSaleType) => {
    const forSaleChiknData = {
      image: `https://api.chikn.farm/api/chikn/thumb/${item.token}`,
      tokenId: item.token,
      price: item.salePrice,
      kg: item.kg,
      rarity: item.rarity,
      head: item.head,
      neck: item.neck,
      torso: item.torso,
      feet: item.feet,
      tail: item.tail,
      body: item.body,
      trim: item.trim,
      background: item.background,
      numOfTraits: item._numOfTraits,
      score: item.score,
      rank: item.rank,
      eggPerDay: item.eggPerDay,
      unclaimedEgg: item.unclaimedEgg,
      unclaimedEggInAVAX: item.unclaimedEggInAVAX,
      feedAccumulated: item.feedAccumulated,
      feedAccumulatedInAVAX: item.feedAccumulatedInAVAX,
      balanceChiknValueInAVAX: item.balanceChiknValueInAVAX,
    }

    return <ForSaleChikn key={item.token} chiknData={forSaleChiknData} />
  })

  return (
    <>
      <PageHeading>Chikn Sniper Page</PageHeading>
      <ul>{forSaleChiknContent}</ul>
    </>
  )
}
