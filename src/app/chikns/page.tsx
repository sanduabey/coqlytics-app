'use client'

import PageHeading from '@/components/util-components/PageHeading'

import ChiknVolChart from '@/components/chikn/ChiknVolChart'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecentChiknSales from '@/components/chikn/RecentChiknSales'
import ChiknChartSection from '@/components/chikn/ChiknChartSection'
const queryClient = new QueryClient()

export default function ChiknPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Chikn Marketplace Stats </PageHeading>
        {/* <section className="bg-gray-200 flex justify-center">
          <ChiknVolChart />
        </section> */}
        <ChiknChartSection />

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Chikn Sales</PageHeading>
          <RecentChiknSales />
        </section>
      </QueryClientProvider>
    </>
  )
}
