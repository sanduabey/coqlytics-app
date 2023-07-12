'use client'

import PageHeading from '@/components/PageHeading'
import SoldItem from '@/components/chikn/SoldChikn'
import RecentChiknSales from '@/components/chikn/RecentChiknSales'
import { QueryClient, QueryClientProvider } from 'react-query'
import ChiknVolChart from '@/components/chikn/ChiknVolChart'

const queryClient = new QueryClient()

export default function ChiknPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading> Chikn Marketplace Stats </PageHeading>
      <section className="bg-gray-200 flex justify-center">
        <ChiknVolChart />
      </section>
      <section className="bg-chiknpurple">
        <PageHeading>Latest Chikns Sales</PageHeading>
        <RecentChiknSales />
      </section>
    </QueryClientProvider>
  )
}
