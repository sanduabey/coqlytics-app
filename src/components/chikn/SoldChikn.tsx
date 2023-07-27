import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldChiknProps = {
  soldChiknData: {
    image: string
    tokenId: number
    kg: number
    soldAt: string
    price: number
    rarity: string
    head: string
    neck: string
    torso: string
    feet: string
    tail: string
    body: string
    trim: string
    background: string
    numOfTraits: number
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldChikn = React.forwardRef<Ref, SoldChiknProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
    props.soldChiknData.soldAt
  )

  // function chiknClickHandler(id:number):void {

  // }

  const chiknClickHandler = (chiknId: number) => {
    window.open(`https://chikn.farm/chikn/${chiknId}`)
  }

  return (
    <li
      className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto"
      ref={ref}
    >
      <div className="cursor-pointer">
        <Image
          src={props.soldChiknData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.soldChiknData.tokenId)}
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className="">
            Chikn #{props.soldChiknData.tokenId} ({props.soldChiknData.rarity})
          </div>
          <div className=""> {props.soldChiknData.kg} Kg</div>
          <div className=""> {props.soldChiknData.price} AVAX</div>
          <div className="text-xs">
            Sold on {soldDate} @ {soldTime} UTC
          </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start">
          <div className="flex-col text-sm">
            <div className="text-lg">
              {props.soldChiknData.numOfTraits} traits
            </div>
            {props.soldChiknData.head !== '' && (
              <div>head : {props.soldChiknData.head}</div>
            )}
            {props.soldChiknData.neck !== '' && (
              <div>neck : {props.soldChiknData.neck}</div>
            )}
            {props.soldChiknData.torso !== '' && (
              <div>torso : {props.soldChiknData.torso}</div>
            )}
            {props.soldChiknData.feet !== '' && (
              <div>feet : {props.soldChiknData.feet}</div>
            )}
            {props.soldChiknData.tail !== '' && (
              <div>tail : {props.soldChiknData.tail}</div>
            )}
            {props.soldChiknData.body !== '' && (
              <div>body : {props.soldChiknData.body}</div>
            )}
            {props.soldChiknData.trim !== '' && (
              <div>trim : {props.soldChiknData.trim}</div>
            )}
            {props.soldChiknData.background !== '' && (
              <div>background : {props.soldChiknData.background}</div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
})
SoldChikn.displayName = 'SoldChikn'

export default SoldChikn
