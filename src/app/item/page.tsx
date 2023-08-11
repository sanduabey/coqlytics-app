'use client'
import ItemVolChartSection from '@/components/item/ItemVolChartSection'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ItemPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading> Item Page </PageHeading>
      <ItemVolChartSection />
    </QueryClientProvider>
  )
}
