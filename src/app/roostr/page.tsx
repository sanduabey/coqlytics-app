'use client'

import RecentRoostrSalesList from '@/components/roostr/RecentRoostrSalesList'
import RoostrVolChartSection from '@/components/roostr/RoostrVolChartSection'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RoostrPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Roostr Marketplace Stats </PageHeading>
        <RoostrVolChartSection />

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Roostr Sales</PageHeading>
          <RecentRoostrSalesList />
        </section>
      </QueryClientProvider>
    </>
  )
}
