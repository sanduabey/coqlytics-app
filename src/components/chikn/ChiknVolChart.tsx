import { ApexOptions } from 'apexcharts'
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'

// const queryClient = new QueryClient()

import dynamic from 'next/dynamic'
import { isQueryKey } from 'react-query/types/core/utils'
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
// const DUMMY_DATA = {
//   series: [
//     {
//       name: 'Volume AVAX',
//       type: 'column',
//       data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
//     },
//     {
//       name: 'Count',
//       type: 'line',
//       data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
//     },
//   ],
// }

const ChiknVolChart = () => {
  let now: Date = new Date()
  let pastDate: Date = new Date()
  pastDate.setDate(pastDate.getDate() - 30)

  // const { data, error, isLoading } = useSWR(
  //   getChiknDailyVolumeData(pastDate, now)
  // )

  // const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['chiknvolumes'],
    queryFn: () => getChiknDailyVolumeData(pastDate, now),
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

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
      },
      {
        opposite: true,
        title: {
          text: 'Count',
        },
      },
    ],
  }

  return (
    // <QueryClientProvider client={queryClient} contextSharing={true}>
    <Chart options={options} series={series} type="bar" width="600" />
    // {/* </QueryClientProvider> */}
  )
}
export default ChiknVolChart
