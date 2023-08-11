'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RoostrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const roostrNavLinks = [
    {
      name: 'Roostr Market',
      href: '/roostr',
    },
    {
      name: 'Roostr Sniper',
      href: '/roostr/sniper',
    },
  ]

  return (
    <>
      <nav className="text-white">
        <ul className="flex gap-4 justify-center">
          {roostrNavLinks.map((link) => {
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
