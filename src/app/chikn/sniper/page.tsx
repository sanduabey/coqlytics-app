import PageHeading from '@/components/util-components/PageHeading'

const getBestForSaleChikns = async () => {
  const response = await fetch(`${process.env.HOST}/api/chikn/sniper`)

  if (!response.ok) {
    throw new Error('Failed to fetch best for sale Chikns')
  }

  const _response = await response.json()

  // console.log(_response)

  return _response.data
}

export default async function ChiknSniperPage() {
  const forSaleChikns = await getBestForSaleChikns() //STOPPED HERER

  return (
    <>
      <PageHeading>Chikn Sniper Page</PageHeading>
    </>
  )
}
