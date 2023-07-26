import Image from 'next/image'
import React from 'react'

type ForSaleChiknProps = {
  chiknData: {
    image: string
    tokenId: number
    kg: number
    price: number
    rarity: number
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
    unclaimedEgg: number
    unclaimedEggInAVAX: number
    feedAccumulated: number
    feedAccumulatedInAVAX: number
    balanceChiknValueInAVAX: number
  }
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const ForSaleChikn = React.forwardRef<Ref, ForSaleChiknProps>((props, ref) => {
  return (
    <li>
      <div>
        <Image
          src={props.chiknData.image}
          alt="Image of For Sale Chikn"
          width={200}
          height={200}
        />
      </div>
      <div> For Sale Chikn Info</div>
    </li>
  )
})
ForSaleChikn.displayName = 'ForSaleChikn'

export default ForSaleChikn
