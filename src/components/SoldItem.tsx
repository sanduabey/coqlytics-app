import Image from 'next/image'

type SoldItemProps = {
  nftType: string
  image: string
  tokenId: number
  kg: number
  soldAt: string
  price: number
  children?: React.ReactNode
}

export default function SoldItem(props: SoldItemProps) {
  return (
    <li className="flex gap-4 items-center text-white p-2">
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
}
