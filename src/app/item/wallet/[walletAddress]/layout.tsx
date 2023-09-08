'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ItemWalletActivityLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    walletAddress: string
  }
}) => {
  const pathname = usePathname()

  const itemWalletActivityNavLinks = [
    {
      name: 'Buys',
      href: `/item/wallet/${params.walletAddress}/buys`,
    },
    {
      name: 'Sells',
      href: `/item/wallet/${params.walletAddress}/sells`,
    },
  ]

  console.log('HERE', params)

  return (
    <>
      {children}
      <div className="text-white w-full flex justify-center ">
        {/* <label className="">
          Wallet Address:{' '}
          <input
            name="walletAddress"
            defaultValue={params.walletAddress}
            className="w-96 text-black"
          />
        </label> */}
        Wallet Address : {params.walletAddress}
      </div>
      <nav>
        <ul>
          {itemWalletActivityNavLinks.map((link) => {
            const isActive = pathname.endsWith(link.href)

            return (
              <Link
                className={`p-4 ${
                  isActive
                    ? 'text-chiknred font-bold bg-chiknpurple'
                    : 'text-white'
                }`}
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default ItemWalletActivityLayout
