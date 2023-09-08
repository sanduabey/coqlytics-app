import PageHeading from '@/components/util-components/PageHeading'
import { redirect } from 'next/navigation'

const DynamicWalletItemActivityPage = ({
  params,
}: {
  params: { walletAddress: string }
}) => {
  redirect(`/item/wallet/${params.walletAddress}/buys`)
}

export default DynamicWalletItemActivityPage
