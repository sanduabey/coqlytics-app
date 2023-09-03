import { BaseSyntheticEvent, useState } from 'react'
import SniperFarmlandList from './SniperFarmlandList'

const FarmlandSniperSection = () => {
  const [selectedSortStrategy, setSelectedSortStrategy] =
    useState('lowestPrice')

  const [selectedMaxPrice, setSelectedMaxPrice] = useState('any')
  const [selectedMinSize, setSelectedMinSize] = useState('N/A')
  const [selectedTileType, setSelectedTileType] = useState('any')
  const [minResourceTileCount, setMinResourceTileCount] = useState(0)

  const sortStrategyChangeHandler = (event: BaseSyntheticEvent) => {
    let selectedOption = event.target.value

    setSelectedSortStrategy(selectedOption)
    // console.log(selectedOption)
  }

  const maxPriceChangeHandler = (event: BaseSyntheticEvent) => {
    let newSelectedMaxPrice = event.target.value

    setSelectedMaxPrice(newSelectedMaxPrice)
  }

  const minSizeChangeHandler = (event: BaseSyntheticEvent) => {
    let newSelectedMinSize = event.target.value

    setSelectedMinSize(newSelectedMinSize)
  }

  const resourceTypeChangeHandler = (event: BaseSyntheticEvent) => {
    let newTileTypeSelected = event.target.value
    setSelectedTileType(newTileTypeSelected)
  }

  const minResouceTileCountChangeHandler = (event: BaseSyntheticEvent) => {
    // console.log(event.target.value)
    let newTileCount = event.target.value

    if (Number(newTileCount) >= 0 && Number(newTileCount) <= 25) {
      setMinResourceTileCount(newTileCount)
    } else {
      event.target.value = minResourceTileCount
    }
  }

  return (
    <section>
      <div className="bg-chiknpurple">
        <div className="flex mr-auto ml-auto max-w-6xl">
          <div className="flex-1 flex justify-start p-6">
            <div className="flex-col">
              <div className="flex-none w-100 ">
                <label>
                  <span className="text-white">max price : </span>
                  <select
                    name="maxPrice"
                    className="rounded-md pl-4 pr-2 text-left"
                    value={selectedMaxPrice}
                    onChange={maxPriceChangeHandler}
                  >
                    <option value="3">3 AVAX</option>
                    <option value="4">4 AVAX</option>
                    <option value="5">5 AVAX</option>
                    <option value="10">10 AVAX</option>
                    <option value="15">15 AVAX</option>
                    <option value="20">20 AVAX</option>
                    <option value="25">25 AVAX</option>
                    <option value="30">30 AVAX</option>
                    <option value="35">35 AVAX</option>
                    <option value="40">40 AVAX</option>
                    <option value="45">45 AVAX</option>
                    <option value="50">50 AVAX</option>
                    <option value="60">60 AVAX</option>
                    <option value="70">70 AVAX</option>
                    <option value="80">80 AVAX</option>
                    <option value="90">90 AVAX</option>
                    <option value="100">100 AVAX</option>
                    <option value="150">150 AVAX</option>
                    <option value="200">200 AVAX</option>
                    <option value="300">300 AVAX</option>
                    <option value="any">ANY</option>
                  </select>
                </label>
              </div>
              <div className="">
                <label>
                  <span className="text-white">min size : </span>
                  <select
                    name="minSize"
                    className="rounded-md pl-4 pr-2 text-left"
                    value={selectedMinSize}
                    onChange={minSizeChangeHandler}
                  >
                    <option value="5">5 bigness </option>
                    <option value="10">5 bigness</option>
                    <option value="15">15 bigness</option>
                    <option value="20">20 bigness</option>
                    <option value="25">25 bigness</option>
                    <option value="30">30 bigness</option>
                    <option value="35">35 bigness</option>
                    <option value="40">40 bigness</option>
                    <option value="45">45 bigness</option>
                    <option value="50">50 bigness</option>
                    <option value="55">55 bigness</option>
                    <option value="60">60 bigness</option>
                    <option value="65">65 bigness</option>
                    <option value="70">70 bigness</option>
                    <option value="75">75 bigness</option>
                    <option value="80">80 bigness</option>
                    <option value="85">85 bigness</option>
                    <option value="85">85 bigness</option>
                    <option value="90">90 bigness</option>
                    <option value="95">95 bigness</option>
                    <option value="100">100 bigness</option>
                    <option value="105">105 bigness</option>
                    <option value="110">110 bigness</option>
                    <option value="115">115 bigness</option>
                    <option value="120">120 bigness</option>
                    <option value="125">125 bigness</option>
                    <option value="N/A">N/A</option>
                  </select>
                </label>
              </div>
              <div className="">
                <label>
                  <span className="text-white">with: </span>
                  <input
                    name="minResourceCount"
                    defaultValue={minResourceTileCount}
                    type="number"
                    max={25}
                    min={0}
                    onChange={minResouceTileCountChangeHandler}
                    className="m-2 rounded-md"
                  ></input>
                  <span className="text-white">or more </span>
                  <select
                    name="resourceType"
                    className="rounded-md pl-4 pr-2 text-left"
                    value={selectedTileType}
                    onChange={resourceTypeChangeHandler}
                  >
                    <option value="nonEmpty">Non-Empty </option>
                    <option value="empty">Empty</option>
                    <option value="avaxium">Avaxium </option>
                    <option value="darkMatter">Dark Matter </option>
                    <option value="gold">Gold</option>
                    <option value="liquidium">Liquidium</option>
                    <option value="lumber">Lumber</option>
                    <option value="mana">Mana</option>
                    <option value="mech">Mech</option>
                    <option value="stone">Stone</option>
                    <option value="tungsten">Tungsten</option>
                    <option value="veg">Veg</option>
                  </select>

                  <span className="text-white"> tiles </span>
                </label>
              </div>
            </div>
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
          minSize={selectedMinSize}
          filterTileType={selectedTileType}
          minFilterTileTypeCount={minResourceTileCount}
        />
      </div>
    </section>
  )
}

export default FarmlandSniperSection
