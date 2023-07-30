import { numberWithCommas } from '@/utils/helpers'
import ForSaleChikn from './ForSaleChikn'
import { useQuery } from '@tanstack/react-query'

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

const ChiknSniperSection = () => {
  // const forSaleChikns = await getBestForSaleChikns()

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['chiknSniper'],
    queryFn: () => getBestForSaleChikns(),
  })

  if (isError) return <div>failed to load</div>
  if (isLoading)
    return <div className="flex justify-center text-white p-6">loading...</div>

  const forSaleChiknContent = data.map(
    (item: ChiknForSaleType, index: number) => {
      const forSaleChiknData = {
        index: index + 1,
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
        unclaimedEgg: item.unclaimedEgg.toFixed(2),
        unclaimedEggInAVAX: item.unclaimedEggInAVAX.toFixed(2),
        feedAccumulated: numberWithCommas(item.feedAccumulated),
        feedAccumulatedInAVAX: item.feedAccumulatedInAVAX.toFixed(2),
        balanceChiknValueInAVAX: item.balanceChiknValueInAVAX.toFixed(2),
      }

      return <ForSaleChikn key={item.token} chiknData={forSaleChiknData} />
    }
  )

  return (
    <section>
      <div className="bg-chiknpurple">
        <div className="flex justify-end p-6 max-w-6xl">
          <label>
            <span className="text-white">sort by : </span>
            <select
              name="snipeOptions"
              value="ChiknOnlyValue"
              className="rounded-md pl-4 pr-2"
            >
              <option value="chiknOnlyValue">Chikn Only Value</option>
              <option value="unclaimedEGG">Unclaimed EGG</option>
              <option value="AVAXperKG">AVAX per KG</option>
              <option value="bestROI">Best Holding ROI</option>
            </select>
          </label>
        </div>

        <ul className="p-3">{forSaleChiknContent}</ul>
      </div>
    </section>
  )
}

export default ChiknSniperSection
