'use client'

import BlueprintVolChartSection from '@/components/blueprint/BlueprintVolChartSection'
import RecentBlueprintSalesList from '@/components/blueprint/RecentBlueprintSalesList'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function BluePrintPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading> BluePrint Page </PageHeading>
      <BlueprintVolChartSection />

      <section className="bg-chiknpurple pt-4">
        <PageHeading>Latest Blueprint Sales</PageHeading>
        <RecentBlueprintSalesList />
      </section>
    </QueryClientProvider>
  )
}
