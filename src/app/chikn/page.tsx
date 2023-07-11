'use client'

import PageHeading from '@/components/PageHeading'
import SoldItem from '@/components/chikn/SoldChiknItem'
import ChiknsSoldList from '@/components/chikn/ChiknsSoldList'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function ChiknPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading> Chikn Marketplace Stats </PageHeading>
      <section className="bg-chiknpurple">
        <PageHeading>Latest Chikns Sales</PageHeading>
        <ChiknsSoldList />
      </section>
    </QueryClientProvider>
  )
}
