import { useQuery } from '@tanstack/react-query'
import { ApexOptions } from 'apexcharts'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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

    // console.log(results)

    const dateLabelsArr = results[0].dateLabels

    let totalVolumeArr = []
    let totalCountArr = []

    for (let i = 0; i < dateLabelsArr.length; i++) {
      totalVolumeArr[i] =
        Math.round(
          (results[0].volumes[i] +
            results[1].volumes[i] +
            results[2].volumes[i] +
            results[3].volumes[i] +
            results[4].volumes[i]) *
            100
        ) / 100

      totalCountArr[i] =
        results[0].counts[i] +
        results[1].counts[i] +
        results[2].counts[i] +
        results[3].counts[i] +
        results[4].counts[i]
    }

    const totalSales = {
      dateLabels: dateLabelsArr,
      counts: totalCountArr,
      volumes: totalVolumeArr,
    }

    let result = {
      chiknSales: results[0],
      roostrSales: results[1],
      farmlandSales: results[2],
      blueprintSales: results[3],
      itemSales: results[4],
      totalSales: totalSales,
    }

    // console.log(result)

    return result
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
    queryKey: ['allCollectionVolumes', props.fromDate, props.toDate],
    queryFn: () => getAllCollectionSalesByDate(props.fromDate, props.toDate),
    // refetchInterval: 0,
  })

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div className="">loading...</div>

  const series = [
    {
      name: 'Total',
      data: data.totalSales.volumes,
    },
    {
      name: 'Chikn',
      data: data.chiknSales.volumes,
    },
    {
      name: 'Roostr',
      data: data.roostrSales.volumes,
    },
    {
      name: 'Farmland',
      data: data.farmlandSales.volumes,
    },
    {
      name: 'Blueprint',
      data: data.blueprintSales.volumes,
    },
    {
      name: 'Item',
      data: data.itemSales.volumes,
    },
  ]
  const options: ApexOptions = {
    chart: {
      height: 350,
    },
    stroke: {
      curve: 'smooth',
      width: [4, 2, 2, 2, 2, 2],
      dashArray: [0, 3, 3, 3, 3, 3],
    },
    colors: ['#2a2c54', '#df3f3d', '#446DF6', '#23CE6B', '#3423A6', '#DE369D'],
    title: {
      text: 'Marketplace Volume (AVAX)',
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [0, 0, 0, 0, 0, 1],
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          ' - ' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ' AVAX'
        )
      },
    },
    labels: data.chiknSales.dateLabels,
    xaxis: {
      // type: 'datetime',
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Volume AVAX',
        },
        decimalsInFloat: 0,
      },
    ],
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' Vol. (AVAX)'
            },
          },
        },
      ],
    },
  }

  return (
    <>
      <div className="grow p-6 max-w-6xl">
        <Chart options={options} series={series} type="line" width="100%" />
      </div>
    </>
  )
}

export default AllCollectionVolChart
