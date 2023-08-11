import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldItemProps = {
  soldItemData: {
    image: string
    tokenId: string
    soldAt: string
    price: number
    tier: string
    name: string
    description: string
    usage: number
    maxUsage: number
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldItem = React.forwardRef<Ref, SoldItemProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
    props.soldItemData.soldAt
  )

  // const imageClickHandler = (url: string) => {
  //   window.open(`${url}`)
  // }

  return (
    <li
      className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto"
      ref={ref}
    >
      <div className="cursor-pointer">
        <Image
          src={props.soldItemData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          // onClick={imageClickHandler.bind(null, props.soldBlueprintData.url)}
          className="rounded-md"
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className="">
            {props.soldItemData.name} ({props.soldItemData.tier})
          </div>
          <div className="">
            {' '}
            Usage {props.soldItemData.usage} / {props.soldItemData.maxUsage}
          </div>
          <div className=""> {props.soldItemData.price} AVAX</div>
          <div className="text-xs">
            Sold on {soldDate} @ {soldTime} UTC
          </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start"></div>
      </div>
    </li>
  )
})
SoldItem.displayName = 'SoldItem'

export default SoldItem
