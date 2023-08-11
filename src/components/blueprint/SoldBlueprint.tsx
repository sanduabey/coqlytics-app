import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldBlueprintProps = {
  soldBlueprintData: {
    image: string
    url: string
    tokenId: string
    soldAt: string
    price: number
    tier: string
    name: string
    description: string
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldBlueprint = React.forwardRef<Ref, SoldBlueprintProps>(
  (props, ref) => {
    const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
      props.soldBlueprintData.soldAt
    )

    const imageClickHandler = (url: string) => {
      window.open(`${url}`)
    }

    return (
      <li
        className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto"
        ref={ref}
      >
        <div className="cursor-pointer">
          <Image
            src={props.soldBlueprintData.image}
            alt="Image of sold NFT"
            width={200}
            height={200}
            onClick={imageClickHandler.bind(null, props.soldBlueprintData.url)}
            className="rounded-md"
          />
        </div>
        <div className="flex grow pl-4 pr-4">
          <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
            <div className="">
              Blueprint #{props.soldBlueprintData.tokenId} (
              {props.soldBlueprintData.tier})
            </div>
            <div className=""> Usage {props.soldBlueprintData.usage}</div>
            <div className=""> {props.soldBlueprintData.price} AVAX</div>
            <div className="text-xs">
              Sold on {soldDate} @ {soldTime} UTC
            </div>
          </div>
          <div className="flex grow text-md pt-2 justify-start"></div>
        </div>
      </li>
    )
  }
)
SoldBlueprint.displayName = 'SoldBlueprint'

export default SoldBlueprint
