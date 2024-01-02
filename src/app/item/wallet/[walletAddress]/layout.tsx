'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ItemWalletActivityLayout = ({
  children,
  params,
}: {
  children: any
  params: {
    walletAddress: string
  }
}) => {
  const pathname = usePathname()

  const itemWalletActivityNavLinks = [
    {
      name: 'Sells',
      href: `/item/wallet/${params.walletAddress}/sells`,
    },
    {
      name: 'Buys',
      href: `/item/wallet/${params.walletAddress}/buys`,
    },
  ]

  return (
    <>
      <div className="text-white w-full flex justify-center ">
        {/* <label className="">
          Wallet Address:{' '}
          <input
            name="walletAddress"
            defaultValue={params.walletAddress}
            className="w-96 text-black"
          />
        </label> */}
        {/* Wallet Address : {params.walletAddress} */}
      </div>
      <nav>
        <ul className="flex gap-4 py-4 justify-center">
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
      {React.cloneElement(children, {
        walletAddress: params.walletAddress,
      })}
    </>
  )
}

export default ItemWalletActivityLayout
