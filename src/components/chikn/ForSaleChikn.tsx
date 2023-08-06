import Image from 'next/image'
import React from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

type ForSaleChiknProps = {
  chiknData: {
    index: number
    image: string
    tokenId: number
    kg: number
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
    score: number
    rank: string
    eggPerDay: number
    unclaimedEgg: string
    unclaimedEggInAVAX: string
    feedAccumulated: string
    feedAccumulatedInAVAX: string
    baseChiknValueInAVAX: string
    daysToBreakEvenFullValue: string
    daysToBreakEvenBaseValue: string
    AVAXperKG: string
  }
  children?: React.ReactNode
}

// type Ref = HTMLLIElement

const ForSaleChikn = (props: ForSaleChiknProps) => {
  const chiknClickHandler = (chiknId: number) => {
    window.open(`https://chikn.farm/chikn/${chiknId}`)
  }

  return (
    <li className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto">
      <div className="flex flex-wrap content-center pr-3">
        {props.chiknData.index}
      </div>
      <div className="cursor-pointer relative">
        <Image
          src={props.chiknData.image}
          alt="Image of For Sale Chikn"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.chiknData.tokenId)}
          className="rounded-md"
        />
        <div className="absolute bottom-0 bg-chiknpurple-dark rounded-md p-1 m-2">
          {props.chiknData.price} AVAX
        </div>
        <div className="absolute top-0 right-0">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-chiknpurple-dark m-1 " />
        </div>
      </div>
      <div className="w-1/2 pl-4 pr-4 text-sm">
        <div className="flex">
          <span className="text-xl">Chikn #{props.chiknData.tokenId}</span>
          <span className="self-center pl-2">
            [{props.chiknData.kg} Kg - {props.chiknData.eggPerDay} $EGG / day]
          </span>
        </div>

        <div>Rank: {props.chiknData.rank}</div>
        <div>
          FEED fed: {props.chiknData.feedAccumulated} (
          {props.chiknData.feedAccumulatedInAVAX} AVAX)
        </div>
        <div>
          Unclaimed EGG: {props.chiknData.unclaimedEgg} (
          {props.chiknData.unclaimedEggInAVAX} AVAX)
        </div>
        <div>AVAX per KG: {props.chiknData.AVAXperKG}</div>
        <div>
          BreakEven full value: {props.chiknData.daysToBreakEvenFullValue} days
        </div>
        <div>
          BreakEven base value: {props.chiknData.daysToBreakEvenBaseValue} days
        </div>
        <div>Chikn Base Price: {props.chiknData.baseChiknValueInAVAX} AVAX</div>
      </div>
      <div className="flex grow text-md pt-2 justify-start">
        <div className="flex-col text-sm">
          <div className="text-lg">{props.chiknData.numOfTraits} traits</div>
          {props.chiknData.head !== '' && (
            <div>head : {props.chiknData.head}</div>
          )}
          {props.chiknData.neck !== '' && (
            <div>neck : {props.chiknData.neck}</div>
          )}
          {props.chiknData.torso !== '' && (
            <div>torso : {props.chiknData.torso}</div>
          )}
          {props.chiknData.feet !== '' && (
            <div>feet : {props.chiknData.feet}</div>
          )}
          {props.chiknData.tail !== '' && (
            <div>tail : {props.chiknData.tail}</div>
          )}
          {props.chiknData.body !== '' && (
            <div>body : {props.chiknData.body}</div>
          )}
          {props.chiknData.trim !== '' && (
            <div>trim : {props.chiknData.trim}</div>
          )}
          {props.chiknData.background !== '' && (
            <div>background : {props.chiknData.background}</div>
          )}
        </div>
      </div>
    </li>
  )
}

export default ForSaleChikn
