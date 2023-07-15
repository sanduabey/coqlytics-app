import { ISODateToDateAndTime } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type SoldItemProps = {
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
  children?: React.ReactNode
}

type Ref = HTMLLIElement

const SoldItem = React.forwardRef<Ref, SoldItemProps>((props, ref) => {
  const { date: soldDate, time: soldTime } = ISODateToDateAndTime(props.soldAt)

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
      <div className=" cursor-pointer">
        <Image
          src={props.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={chiknClickHandler.bind(null, props.tokenId)}
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className="">
            Chikn #{props.tokenId} ({props.rarity})
          </div>
          <div className=""> {props.kg} Kg</div>
          <div className=""> {props.price} AVAX</div>
          <div className="text-xs">
            Sold on {soldDate} @ {soldTime} UTC
          </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start">
          <div className="flex-col text-sm">
            <div className="text-lg"># Traits : {props.numOfTraits}</div>
            {props.head !== '' && <div>head : {props.head}</div>}
            {props.neck !== '' && <div>neck : {props.neck}</div>}
            {props.torso !== '' && <div>torso : {props.torso}</div>}
            {props.feet !== '' && <div>feet : {props.feet}</div>}
            {props.tail !== '' && <div>tail : {props.tail}</div>}
            {props.body !== '' && <div>body : {props.body}</div>}
            {props.trim !== '' && <div>trim : {props.trim}</div>}
            {props.background !== '' && (
              <div>background : {props.background}</div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
})
SoldItem.displayName = 'SoldItem'

export default SoldItem
