import { useQuery } from '@tanstack/react-query'

async function getChiknDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `${process.env.HOST}/api/chikn/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Chikn Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

async function getRoostrDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `${process.env.HOST}/api/roostr/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Roostr Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

async function getFarmlandDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `${process.env.HOST}/api/farmland/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Roostr Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

async function getBlueprintDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `${process.env.HOST}/api/blueprint/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Blueprint Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

async function getItemDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `${process.env.HOST}/api/item/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Item Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

const getAllCollectionSalesByDate = async (from: Date, to: Date) => {
  try {
    const chiknSalesPromise = getChiknDailyVolumeData(from, to)
    const roostrSalesPromise = getRoostrDailyVolumeData(from, to)
    const farmlandSalesPromise = getFarmlandDailyVolumeData(from, to)
    const blueprintSalesPromise = getBlueprintDailyVolumeData(from, to)
    const itemSalesPromise = getItemDailyVolumeData(from, to)

    let results = await Promise.all([
      chiknSalesPromise,
      roostrSalesPromise,
      farmlandSalesPromise,
      blueprintSalesPromise,
      itemSalesPromise,
    ])

    console.log(results)

    return 1
  } catch (error) {
    throw error
  }
}

type VolChartProps = {
  fromDate: Date
  toDate: Date
}

const AllCollectionVolChart = (props: VolChartProps) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['allCollectionVolumes'],
    queryFn: () => getAllCollectionSalesByDate(props.fromDate, props.toDate),
    // refetchInterval: 0,
  })

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div className="">loading...</div>

  return <div>All Collection Chart {data}</div>
}

export default AllCollectionVolChart
