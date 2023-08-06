import { numberWithCommas } from '@/utils/helpers'
import ForSaleChikn from './ForSaleChikn'
import { useQuery } from '@tanstack/react-query'
import { BaseSyntheticEvent, useState } from 'react'

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

const ChiknSniperSection = () => {
  const [selectedSortStrategy, setSelectedSortStrategy] =
    useState('chiknBaseValue')

  const [selectedMaxPrice, setSelectedMaxPrice] = useState('any')

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['chiknSniper', selectedSortStrategy, selectedMaxPrice],
    queryFn: () => getBestForSaleChikns(selectedSortStrategy, selectedMaxPrice),
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
        baseChiknValueInAVAX: item.baseChiknValueInAVAX.toFixed(2),
        AVAXperKG: item.AVAXperKG.toFixed(2),
        daysToBreakEvenFullValue: item.daysToBreakEvenFullValue.toFixed(0),
        daysToBreakEvenBaseValue: item.daysToBreakEvenBaseValue.toFixed(0),
      }

      return <ForSaleChikn key={item.token} chiknData={forSaleChiknData} />
    }
  )

  const sortStrategyChangeHandler = (event: BaseSyntheticEvent) => {
    let selectedOption = event.target.value

    setSelectedSortStrategy(selectedOption)
    // console.log(selectedOption)
  }

  const maxPriceChangeHandler = (event: BaseSyntheticEvent) => {
    let selectedMaxPrice = event.target.value

    setSelectedMaxPrice(selectedMaxPrice)
  }

  return (
    <section>
      <div className="bg-chiknpurple">
        <div className="flex mr-auto ml-auto max-w-6xl">
          <div className="flex-1 flex justify-start p-6">
            <label>
              <span className="text-white">max price : </span>
              <select
                name="maxPrice"
                className="rounded-md pl-4 pr-2 text-center"
                value={selectedMaxPrice}
                onChange={maxPriceChangeHandler}
              >
                <option value="30">30 AVAX</option>
                <option value="40">40 AVAX</option>
                <option value="50">50 AVAX</option>
                <option value="60">60 AVAX</option>
                <option value="70">70 AVAX</option>
                <option value="80">80 AVAX</option>
                <option value="90">90 AVAX</option>
                <option value="100">100 AVAX</option>
                <option value="150">150 AVAX</option>
                <option value="200">200 AVAX</option>
                <option value="300">300 AVAX</option>
                <option value="any">any</option>
              </select>
            </label>
          </div>
          <div className="flex-1 flex justify-end p-6 max-w-6xl">
            <label>
              <span className="text-white">sort by : </span>
              <select
                name="sortStrategy"
                value={selectedSortStrategy}
                className="rounded-md pl-4 pr-2"
                onChange={sortStrategyChangeHandler}
              >
                <option value="chiknBaseValue">
                  Chikn Value - (FEED fed + unclaimed EGG)
                </option>
                <option value="unclaimedEGG">Most Unclaimed EGG</option>
                <option value="AVAXperKG">AVAX per KG</option>
                <option value="breakevenFullValue">
                  Fastest Breakeven Full Price
                </option>
                <option value="breakevenBaseValue">
                  Fastest Breakeven Base Price
                </option>
              </select>
            </label>
          </div>
        </div>

        <ul className="p-3">{forSaleChiknContent}</ul>
      </div>
    </section>
  )
}

export default ChiknSniperSection
