'use client'
import ChiknSniperSection from '@/components/chikn/ChiknSniperSection'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ChiknSniperPage() {
  // const [selectedSortStrategy, setSelectedSortStrategy] =
  //   useState('chiknOnlyValue')

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading>Chikn Sniper Tool</PageHeading>

        <ChiknSniperSection />
      </QueryClientProvider>
    </>
  )
}
