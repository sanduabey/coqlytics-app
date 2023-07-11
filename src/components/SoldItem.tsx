import Image from 'next/image'
import React from 'react'

type SoldItemProps = {
  // ref: HTMLElement | null
  nftType: string
  image: string
  tokenId: number
  kg: number
  soldAt: string
  price: number
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldItem = React.forwardRef<Ref, SoldItemProps>((props, ref) => {
  return (
    <li
      className="flex gap-4 items-center text-white p-3 bg-chiknpurple-dark rounded-md m-3"
      ref={ref}
    >
      <Image
        src={props.image}
        alt="Image of sold NFT"
        width={100}
        height={100}
      />

      <span>
        {props.nftType} #{props.tokenId}
      </span>
      <span> {props.kg} Kg</span>
      <span>Sold at {props.soldAt} </span>
      <span> {props.price} AVAX</span>
    </li>
  )
})
SoldItem.displayName = 'SoldItem'

export default SoldItem
