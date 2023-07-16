import { ApexOptions } from 'apexcharts'
import { useQuery } from '@tanstack/react-query'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

async function getChiknDailyVolumeData(from: Date, to: Date) {
  const response = await fetch(
    `http://localhost:3000/api/chikn/daily-volume?from=${from}&to=${to}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Daily Chikn Volume Data')
  }

  const _response = await response.json()

  return _response.data
}

const ChiknVolChart = () => {
  let now: Date = new Date()
  let pastDate: Date = new Date()
  pastDate.setDate(pastDate.getDate() - 30)

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['chiknvolumes'],
    queryFn: () => getChiknDailyVolumeData(pastDate, now),
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

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
      text: 'Chikn Sales',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: data.dateLabels,
    xaxis: {
      type: 'datetime',
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
export default ChiknVolChart
