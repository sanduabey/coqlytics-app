import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldFarmlandProps = {
  soldFarmlandData: {
    image: string
    tokenId: number
    size: string
    soldAt: string
    price: number
    rarity: string
    bigness: string
    multiplier: number
    score: number
    tiles: Object[]
    // numOfResources: number
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldFarmland = React.forwardRef<Ref, SoldFarmlandProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
    props.soldFarmlandData.soldAt
  )

  // function chiknClickHandler(id:number):void {

  // }

  const chiknClickHandler = (tokenId: number) => {
    window.open(`https://chikn.farm/roostr/${tokenId}`)
  }

  return (
    <li
      className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto"
      ref={ref}
    >
      <div className="cursor-pointer">
        <Image
          src={props.soldFarmlandData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.soldFarmlandData.tokenId)}
          className="rounded-md"
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className="">
            Farmland #{props.soldFarmlandData.tokenId} (
            {props.soldFarmlandData.rarity})
          </div>
          <div className=""> Size {props.soldFarmlandData.size}</div>
          <div className=""> {props.soldFarmlandData.price} AVAX</div>
          <div className="text-xs">
            Sold on {soldDate} @ {soldTime} UTC
          </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start"></div>
      </div>
    </li>
  )
})
SoldFarmland.displayName = 'SoldFarmland'

export default SoldFarmland
