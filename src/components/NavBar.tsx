'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    name: 'Chikn',
    href: '/chikn',
  },
  {
    name: 'Roostr',
    href: '/roostr',
  },
  {
    name: 'FarmLand',
    href: '/farmland',
  },
  {
    name: 'BluePrint',
    href: '/blueprint',
  },
  {
    name: 'Item',
    href: '/item',
  },
]

export default function NavBar() {
  const pathname = usePathname()
  // console.log(pathname)
  // console.log(pathname.startsWith('/chikns'))

  return (
    <nav className="flex pl-4 pr-4 bg-chiknpurple">
      <div className="basis-1/5 justify-start text-chiknred text-lg font-bold tracking-wide p-4">
        <Link href="/">CoQlytics.xyz</Link>
      </div>

      <ul className="basis-4/5 flex gap-4 justify-end">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)

          return (
            <Link
              className={`p-4 ${
                isActive
                  ? 'text-chiknred font-bold  bg-chiknpurple-dark'
                  : 'text-white'
              }
              `}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          )
        })}

        {/* <li className="hover:underline">
          <Link
            href="chikns"
            className={
              pathname.startsWith('/chikns') ? 'text-red-400' : 'text-white'
            }
          >
            Chikns
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="roostrs">Roostrs</Link>
        </li>
        <li className="hover:underline">
          <Link href="farmlands"> FarmLands</Link>
        </li>
        <li className="hover:underline">
          <Link href="blueprints">BluePrints</Link>
        </li>
        <li className="hover:underline">
          <Link href="items"> Items</Link>
        </li> */}
      </ul>
    </nav>
  )
}
