import { ApexOptions } from 'apexcharts'
import { useQuery } from '@tanstack/react-query'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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
const initialToDate = new Date()
const initialFromDate = new Date()
initialFromDate.setDate(initialToDate.getDate() - 30)

type BlueprintVolChartProps = {
  fromDate: Date
  toDate: Date
}

const BlueprintVolChart = (props: BlueprintVolChartProps) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['blueprintVolumes', props.fromDate, props.toDate],
    queryFn: () => getBlueprintDailyVolumeData(props.fromDate, props.toDate),
    // refetchInterval: 0,
  })

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div className="">loading...</div>

  // console.log(data)

  const series = [
    {
      name: 'Volume AVAX',
      type: 'column',
      data: data.volumes,
    },
    {
      name: 'Count',
      type: 'line',
      data: data.counts,
    },
  ]

  const maxCount = Math.max(...data.counts)

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: 'Blueprint Sales Volume (AVAX)',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: data.dateLabels,
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
      {
        opposite: true,
        title: {
          text: 'Count',
        },
        max: maxCount * 3,
        decimalsInFloat: 0,
      },
    ],
  }

  return (
    <div className="grow p-6 max-w-6xl">
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  )
}
export default BlueprintVolChart
