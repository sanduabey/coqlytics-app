import PageHeading from '@/components/util-components/PageHeading'

const DynamicWalletItemActivityPage = ({
  params,
}: {
  params: { walletAddress: string }
}) => {
  return (
    <>
      <PageHeading> Wallet ID: {params.walletAddress} Page</PageHeading>
    </>
  )
}

export default DynamicWalletItemActivityPage
