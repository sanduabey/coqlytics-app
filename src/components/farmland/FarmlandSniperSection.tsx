import { BaseSyntheticEvent, useState } from 'react'
import SniperFarmlandList from './SniperFarmlandList'

const FarmlandSniperSection = () => {
  const [selectedSortStrategy, setSelectedSortStrategy] =
    useState('lowestPrice')

  const [selectedMaxPrice, setSelectedMaxPrice] = useState('any')

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
      <div className="flex mr-auto ml-auto max-w-6xl">
        <div className="flex-1 flex justify-start p-6">
          <label>
            <span className="text-white">max price : </span>
            <select
              name="maxPrice"
              className="rounded-md pl-4 pr-2 text-left"
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
              <option value="lowestPrice">Lowest price</option>
              <option value="highestPrice">Highest price</option>
              <option value="lowestScore">Lowest score</option>
              <option value="highestScore">Highest score</option>
              <option value="lowestSize">Lowest size</option>
              <option value="highestSize">Highest size</option>
              <option value="lowestFertility">
                Lowest fertility multiplier
              </option>
              <option value="highestFertility">
                Highest fertility multiplier
              </option>
            </select>
          </label>
        </div>
      </div>

      <SniperFarmlandList
        sortStrategy={selectedSortStrategy}
        maxPriceAVAX={selectedMaxPrice}
      />
    </section>
  )
}

export default FarmlandSniperSection
