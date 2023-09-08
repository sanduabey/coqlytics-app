'use client'
import RecentItemBuysByWalletList from '@/components/item/RecentItemBuysByWalletList'
import PageHeading from '@/components/util-components/PageHeading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
const ItemBuysByWalletPage = ({
  params,
}: {
  params: { walletAddress: string }
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeading>Item Buys By Wallet: {params.walletAddress}</PageHeading>
      <section className="bg-chiknpurple">
        <RecentItemBuysByWalletList walletAddress={params.walletAddress} />
      </section>
    </QueryClientProvider>
  )
}

export default ItemBuysByWalletPage
