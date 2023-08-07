'use client'

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
      </QueryClientProvider>
    </>
  )
}
