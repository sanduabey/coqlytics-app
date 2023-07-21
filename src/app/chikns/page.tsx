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
        <ChiknChartSection />

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Chikn Sales</PageHeading>
          <RecentChiknSales />
        </section>
      </QueryClientProvider>
    </>
  )
}
