import { ISODateToDateAndTime } from '@/utils/helpers'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
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
    rank: string
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

const SoldChikn = React.forwardRef<Ref, SoldChiknProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(
    props.soldChiknData.soldAt
  )

  const chiknClickHandler = (chiknId: number) => {
    window.open(`https://chikn.farm/chikn/${chiknId}`)
  }

  return (
    <li
      className={`flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto ${
        props.soldChiknData.price >= props.priceBoundary?.maxBoundaryAVAX
          ? 'border-solid border-2 border-chikngold'
          : ''
      }`}
      ref={ref}
    >
      <div className="cursor-pointer relative">
        <Image
          src={props.soldChiknData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.soldChiknData.tokenId)}
          className="rounded-md"
        />

        <div className="absolute top-0 right-0">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-chiknpurple-dark m-1 " />
        </div>
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-l w-1/2">
          <div className="text-2xl">
            Chikn #{props.soldChiknData.tokenId} [{props.soldChiknData.kg} Kg]
          </div>
          <div>
            Rank: {props.soldChiknData.rank} [{props.soldChiknData.rarity}]
          </div>

          <div className="">Sold for {props.soldChiknData.price} AVAX</div>
          <div></div>
          <div></div>
          <div className="text-xs">
            On {soldDate} @ {soldTime} UTC
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
