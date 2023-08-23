import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldRoostrProps = {
  soldRoostrData: {
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
  priceBoundary: {
    minBoundaryAVAX: number
    maxBoundaryAVAX: number
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldRoostr = React.forwardRef<Ref, SoldRoostrProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
    props.soldRoostrData.soldAt
  )

  const chiknClickHandler = (tokenId: number) => {
    window.open(`https://chikn.farm/roostr/${tokenId}`)
  }

  return (
    <li
      className={`flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto ${
        props.soldRoostrData.price >= props.priceBoundary?.maxBoundaryAVAX
          ? 'border-solid border-2 border-chikngold'
          : ''
      }`}
      ref={ref}
    >
      <div className="cursor-pointer">
        <Image
          src={props.soldRoostrData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.soldRoostrData.tokenId)}
          className="rounded-md"
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className="">
            Roostr #{props.soldRoostrData.tokenId} (
            {props.soldRoostrData.rarity})
          </div>
          <div className=""> {props.soldRoostrData.kg} Kg</div>
          <div className=""> {props.soldRoostrData.price} AVAX</div>
          <div className="text-xs">
            Sold on {soldDate} @ {soldTime} UTC
          </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start">
          <div className="flex-col text-sm">
            <div className="text-lg">
              {props.soldRoostrData.numOfTraits} traits
            </div>
            {props.soldRoostrData.head !== '' && (
              <div>head : {props.soldRoostrData.head}</div>
            )}
            {props.soldRoostrData.neck !== '' && (
              <div>neck : {props.soldRoostrData.neck}</div>
            )}
            {props.soldRoostrData.torso !== '' && (
              <div>torso : {props.soldRoostrData.torso}</div>
            )}
            {props.soldRoostrData.feet !== '' && (
              <div>feet : {props.soldRoostrData.feet}</div>
            )}
            {props.soldRoostrData.tail !== '' && (
              <div>tail : {props.soldRoostrData.tail}</div>
            )}
            {props.soldRoostrData.body !== '' && (
              <div>body : {props.soldRoostrData.body}</div>
            )}
            {props.soldRoostrData.trim !== '' && (
              <div>trim : {props.soldRoostrData.trim}</div>
            )}
            {props.soldRoostrData.background !== '' && (
              <div>background : {props.soldRoostrData.background}</div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
})
SoldRoostr.displayName = 'SoldRoostr'

export default SoldRoostr
