'use client'
import RecentItemBuysByWalletList from '@/components/item/RecentItemBuysByWalletList'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
const ItemWalletBuysPage = ({
  params,
}: {
  params: { walletAddress: string }
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading>Item Buys</PageHeading>
      <RecentItemBuysByWalletList walletAddress={params.walletAddress} />
    </QueryClientProvider>
  )
}

export default ItemWalletBuysPage
