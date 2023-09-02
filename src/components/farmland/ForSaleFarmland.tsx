import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
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
  const imageClickHandler = (tokenId: number) => {
    window.open(`https://chikn.farm/farm/${tokenId}`)
  }

  return (
    <li className="flex text-white p-3 bg-chiknpurple-dark rounded-md m-2 max-w-5xl ml-auto mr-auto">
      <div className="flex flex-wrap content-center pr-3">
        {props.farmlandData.index}
      </div>
      <div className="cursor-pointer relative">
        <Image
          src={props.farmlandData.image}
          alt="Image of sold NFT"
          width={200}
          height={200}
          onClick={imageClickHandler.bind(null, props.farmlandData.tokenId)}
          className="rounded-md"
        />
        <div className="absolute bottom-0 bg-chiknpurple-dark rounded-md p-1 m-2">
          {props.farmlandData.price} AVAX
        </div>
        <div className="absolute top-0 right-0">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-chiknpurple-dark m-1 " />
        </div>
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
