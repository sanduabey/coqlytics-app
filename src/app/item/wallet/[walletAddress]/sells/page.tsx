'use client'

import RecentItemSellsByWalletList from '@/components/item/RecentItemSellsByWalletList'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
const ItemSellsByWalletPage = ({
  params,
}: {
  params: { walletAddress: string }
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading>Item Buys</PageHeading>
      <section className="bg-chiknpurple">
        <RecentItemSellsByWalletList walletAddress={params.walletAddress} />
      </section>
    </QueryClientProvider>
  )
}

export default ItemSellsByWalletPage
