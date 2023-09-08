'use client'
import PageHeading from '@/components/util-components/PageHeading'
import { useRouter } from 'next/navigation'

const ItemWalletPage = () => {
  const router = useRouter()

  const submitHandler = (event: React.BaseSyntheticEvent) => {
    event.preventDefault()

    const walletAddress: string = event.target[0].value
    console.log(walletAddress)

    router.push(`wallet/${walletAddress}`)
  }
  return (
    <>
      <PageHeading>Item Wallet Activity Page</PageHeading>

      <form onSubmit={submitHandler}>
        <div className="text-white flex justify-center">
          <label className="">
            Wallet Address:{' '}
            <input
              name="walletAddress"
              defaultValue="0x"
              className="w-96 text-black"
            />
          </label>

          <button
            type="submit"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Scan Activity
          </button>
        </div>
      </form>
    </>
  )
}

export default ItemWalletPage
