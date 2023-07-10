import PageHeading from '@/components/PageHeading'
import SoldItem from '@/components/SoldItem'

// chikn thumbdail url : https://api.chikn.farm/api/chikn/thumb/123',

// const DUMMY_LATEST_SALES = [
//   {
//     id: 1,
//     chiknId: 123,
//     soldAt: '2023-04-07T19:34:58.000Z',
//     price: 36.95,
//     kg: 42,
//     rarity: 'nice',
//   },
//   {
//     id: 2,
//     chiknId: 124,
//     soldAt: '2023-04-17T19:34:58.000Z',
//     price: 95,
//     kg: 48,
//     rarity: 'common',
//   },
//   {
//     id: 3,
//     chiknId: 235,
//     soldAt: '2023-04-07T19:34:58.000Z',
//     price: 369,
//     kg: 112,
//     rarity: 'rare',
//   },
// ]

type chiknSaleDoc = {
  id: string
  chiknId: number
  price: number
  kg: number
  soldAt: string
  tokenId: number
}

export default async function ChiknPage() {
  const response = await fetch('http://localhost:3000/api/chikn-sales')

  if (!response.ok) {
    throw new Error('Failed to fetch chikn data')
  }
  const jsonResponse = await response.json()

  return (
    <>
      <PageHeading> Chikn Page </PageHeading>
      <section>
        <ul>
          {jsonResponse.data.map((item: chiknSaleDoc) => (
            <SoldItem
              key={item.id}
              nftType="chikn"
              image={`https://api.chikn.farm/api/chikn/thumb/${item.chiknId}`}
              tokenId={item.chiknId}
              price={item.price}
              kg={item.kg}
              soldAt={item.soldAt}
            />
          ))}
        </ul>
      </section>
    </>
  )
}
