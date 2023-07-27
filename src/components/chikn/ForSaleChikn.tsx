import Image from 'next/image'
import React from 'react'

type ForSaleChiknProps = {
  chiknData: {
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
    unclaimedEgg: number
    unclaimedEggInAVAX: number
    feedAccumulated: number
    feedAccumulatedInAVAX: number
    balanceChiknValueInAVAX: number
  }
  children?: React.ReactNode
}

// type Ref = HTMLLIElement

const ForSaleChikn = (props: ForSaleChiknProps) => {
  return (
    <li className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto">
      <div>
        <Image
          src={props.chiknData.image}
          alt="Image of For Sale Chikn"
          width={200}
          height={200}
        />
      </div>
      <div>
        <div>Chikn #{props.chiknData.tokenId}</div>
        <div>
          {props.chiknData.kg} Kg ({props.chiknData.eggPerDay} $EGG / day)
        </div>
        <div>Price: {props.chiknData.price}</div>
        <div>
          FEED fed: {props.chiknData.feedAccumulated} (
          {props.chiknData.feedAccumulatedInAVAX} AVAX)
        </div>
        <div>
          Unclaimed EGG: {props.chiknData.unclaimedEgg} (
          {props.chiknData.unclaimedEggInAVAX} AVAX)
        </div>
        <div>ChiknValue: {props.chiknData.balanceChiknValueInAVAX} AVAX</div>
        <div></div>
      </div>
    </li>
  )
}

export default ForSaleChikn
