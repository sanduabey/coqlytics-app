import Image from 'next/image'

type ForSaleFarmlandProps = {
  farmlandData: {
    index: number
    image: string
    tokenId: number
    size: string
    price: number
    rarity: string
    bigness: string
    multiplier: number
    score: number
    tiles: Object[]
  }
  children?: React.ReactNode
}

const ForSaleFarmland = (props: ForSaleFarmlandProps) => {
  return (
    <li>
      <div className="cursor-pointer">
        <Image
          src={props.farmlandData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          // onClick={imageClickHandler.bind(null, props.farmlandData.tokenId)}
          className="rounded-md"
        />
      </div>
      <div className="flex grow pl-4 pr-4">
        <div className="flex flex-col gap-2 justify-center text-xl w-1/2">
          <div className={props.farmlandData.rarity ? 'text-chikngold' : ''}>
            Farmland #{props.farmlandData.tokenId}
            {props.farmlandData.rarity &&
              ` (${props.farmlandData.rarity})`} - {props.farmlandData.bigness}
          </div>
          <div> {props.farmlandData.price} AVAX</div>
          <div>
            {' '}
            bigness: {props.farmlandData.size} ({props.farmlandData.multiplier}
            x)
          </div>
          <div> score: {props.farmlandData.score} </div>
        </div>
        <div className="flex grow text-md pt-2 justify-start"></div>
      </div>
    </li>
  )
}

export default ForSaleFarmland
