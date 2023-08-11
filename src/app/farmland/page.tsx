'use client'

import FarmlandVolChartSection from '@/components/farmland/FarmlandVolChartSection'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function FarmLandPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading> Farmland Page </PageHeading>
        <FarmlandVolChartSection />
      </QueryClientProvider>
    </>
  )
}
