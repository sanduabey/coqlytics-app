'use client'

import PageHeading from '@/components/util-components/PageHeading'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecentChiknSalesList from '@/components/chikn/RecentChiknSalesList'
import ChiknVolChartSection from '@/components/chikn/ChiknVolChartSection'
const queryClient = new QueryClient()

export default function ChiknPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Chikn Marketplace Stats </PageHeading>
        <ChiknVolChartSection />

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Chikn Sales</PageHeading>
          <RecentChiknSalesList />
        </section>
      </QueryClientProvider>
    </>
  )
}
