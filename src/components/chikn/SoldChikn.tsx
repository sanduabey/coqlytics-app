import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldItemProps = {
  image: string
  tokenId: number
  kg: number
  soldAt: string
  price: number
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldItem = React.forwardRef<Ref, SoldItemProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(props.soldAt)

  return (
    <li
      className="flex gap-3 text-white p-3 bg-chiknpurple-dark rounded-md m-3 "
      ref={ref}
    >
      <div className="flex-wrap">
        <Image
          src={props.image}
          alt="Image of sold NFT"
          width={150}
          height={150}
        />
      </div>

      <div className="flex flex-col flex-grow justify-center pl-4 pr-4">
        <div className="text-xl flex flex-wrap justify-between ">
          <div className="">Chikn #{props.tokenId}</div>
          <div className=""> {props.price} AVAX</div>
          <div className=""> {props.kg} Kg</div>
        </div>
        <div className="text-xs pt-2">
          <div className="">
            Sold {soldDate} @ {soldTime}
          </div>
        </div>
      </div>
    </li>
  )
})
SoldItem.displayName = 'SoldItem'

export default SoldItem
