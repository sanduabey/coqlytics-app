import { ApexOptions } from 'apexcharts'
import { useQuery } from '@tanstack/react-query'

import dynamic from 'next/dynamic'
import DateRangePicker from '../util-components/DateRangePicker'
import { useState } from 'react'
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
const initialToDate = new Date()
const initialFromDate = new Date()
initialFromDate.setDate(initialToDate.getDate() - 30)

const ChiknVolChart = () => {
  const [fromDate, setFromDate] = useState(initialFromDate)
  const [toDate, setToDate] = useState(initialToDate)

  // let now: Date = new Date()
  // let pastDate: Date = new Date()
  // pastDate.setDate(pastDate.getDate() - 30)

  // let fromDate: Date = pastDate
  // let toDate: Date = now

  console.log('HHHHHHH')

  const dateRangeChangeHander = (from: Date, to: Date) => {
    console.log('FROM', from, 'TO', to)
    setFromDate(from)
    setToDate(to)
    refetch()
    // fromDate = from
    // toDate = to
  }
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['chiknvolumes', fromDate, toDate],
    queryFn: () => getChiknDailyVolumeData(fromDate, toDate),
    // refetchInterval: 0,
  })

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div className="">loading...</div>

  console.log(data)

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
      <div className="flex justify-end">
        <DateRangePicker
          name="chiknVolDateRange"
          onDateRangeChange={dateRangeChangeHander}
          initFrom={fromDate}
          initTo={toDate}
        ></DateRangePicker>
      </div>

      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  )
}
export default ChiknVolChart
