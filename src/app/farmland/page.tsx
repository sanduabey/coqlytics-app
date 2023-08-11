'use client'

import FarmlandVolChartSection from '@/components/farmland/FarmlandVolChartSection'
import RecentFarmlandSalesList from '@/components/farmland/RecentFarmlandSalesList'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function FarmLandPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Farmland Page </PageHeading>
        <FarmlandVolChartSection />

        <section className="bg-chiknpurple pt-4">
          <PageHeading>Latest Farmland Sales</PageHeading>
          <RecentFarmlandSalesList />
        </section>
      </QueryClientProvider>
    </>
  )
}
