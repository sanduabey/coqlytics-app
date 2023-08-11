'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FarmlandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const farmlandNavLinks = [
    {
      name: 'Farmland Market',
      href: '/farmland',
    },
    {
      name: 'Farmland Sniper',
      href: '/farmland/sniper',
    },
  ]

  return (
    <>
      <nav className="text-white">
        <ul className="flex gap-4 justify-center">
          {farmlandNavLinks.map((link) => {
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
      {children}
    </>
  )
}
