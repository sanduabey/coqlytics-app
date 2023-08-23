import { numberWithCommas } from '@/utils/helpers'
import { useQuery } from '@tanstack/react-query'
import ForSaleChikn from './ForSaleChikn'

type SniperChiknListPropsType = {
  sortStrategy: string
  maxPriceAVAX: string
}

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
  baseChiknValueInAVAX: number
  AVAXperKG: number
  daysToBreakEvenFullValue: number
  daysToBreakEvenBaseValue: number
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

const getBestForSaleChikns = async (
  sortStrategy: string,
  maxPriceAVAX: string
) => {
  const response = await fetch(
    `${process.env.HOST}/api/chikn/sniper?sort=${sortStrategy}&maxPrice=${maxPriceAVAX}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch best for sale Chikns')
  }

  const _response = await response.json()

  // console.log(_response)

  return _response.data
}

const SniperChiknList = (props: SniperChiknListPropsType) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['chiknSniper', props.sortStrategy, props.maxPriceAVAX],
    queryFn: () => getBestForSaleChikns(props.sortStrategy, props.maxPriceAVAX),
  })

  if (isError) return <div>failed to load</div>
  if (isLoading)
    return <div className="flex justify-center text-white p-6">loading...</div>

  const forSaleChiknContent = data.map(
    (item: ChiknForSaleType, index: number) => {
      //Rarity first letter capitalization
      const rarityWord = item.rarity
      const firstLetter = rarityWord.charAt(0)
      const firstLetterCap = firstLetter.toUpperCase()
      const remainingLetters = rarityWord.slice(1)
      const capitalizedRarityWord = firstLetterCap + remainingLetters

      const forSaleChiknData = {
        index: index + 1,
        image: `https://api.chikn.farm/api/chikn/thumb/${item.token}`,
        tokenId: item.token,
        price: item.salePrice,
        kg: item.kg,
        rarity: capitalizedRarityWord,
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
        unclaimedEgg: item.unclaimedEgg.toFixed(2),
        unclaimedEggInAVAX: item.unclaimedEggInAVAX.toFixed(2),
        feedAccumulated: numberWithCommas(item.feedAccumulated),
        feedAccumulatedInAVAX: item.feedAccumulatedInAVAX.toFixed(2),
        baseChiknValueInAVAX: item.baseChiknValueInAVAX.toFixed(2),
        AVAXperKG: item.AVAXperKG.toFixed(2),
        daysToBreakEvenFullValue: item.daysToBreakEvenFullValue.toFixed(0),
        daysToBreakEvenBaseValue: item.daysToBreakEvenBaseValue.toFixed(0),
      }

      return <ForSaleChikn key={item.token} chiknData={forSaleChiknData} />
    }
  )

  return <ul className="p-3">{forSaleChiknContent}</ul>
}

export default SniperChiknList
