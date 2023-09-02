'use client'
import FarmlandSniperSection from '@/components/farmland/FarmlandSniperSection'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const FarmlandSniperPage = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeading>Farmland Sniper Tool</PageHeading>
        <FarmlandSniperSection />
      </QueryClientProvider>
    </>
  )
}

export default FarmlandSniperPage
