'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const itemNavLinks = [
    {
      name: 'Item Market',
      href: '/item/market',
    },
    {
      name: 'Item Sniper',
      href: '/item/sniper',
    },
    {
      name: 'Wallet Activity',
      href: '/item/wallet',
    },
  ]

  return (
    <>
      <nav className="text-white">
        <ul className="flex gap-4 justify-center">
          {itemNavLinks.map((link) => {
            const isActive = pathname.includes(link.href)

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
      {children}
    </>
  )
}
