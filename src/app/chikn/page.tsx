'use client'

import PageHeading from '@/components/PageHeading'

import ChiknVolChart from '@/components/chikn/ChiknVolChart'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecentChiknSales from '@/components/chikn/RecentChiknSales'
const queryClient = new QueryClient()

export default function ChiknPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Chikn Marketplace Stats </PageHeading>
        <section className="bg-gray-200 flex justify-center">
          <ChiknVolChart />
        </section>

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Chikns Sales</PageHeading>
          <RecentChiknSales />
        </section>
      </QueryClientProvider>
    </>
  )
}
