'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    name: 'Chikns',
    href: '/chikns',
  },
  {
    name: 'Roostrs',
    href: '/roostrs',
  },
  {
    name: 'FarmLands',
    href: '/farmlands',
  },
  {
    name: 'BluePrints',
    href: '/blueprints',
  },
  {
    name: 'Items',
    href: '/items',
  },
]

export default function NavBar() {
  const pathname = usePathname()
  // console.log(pathname)
  // console.log(pathname.startsWith('/chikns'))

  return (
    <nav className="flex p-4 bg-chiknpurple">
      <div className="basis-1/5 justify-start text-white">
        <Link href="/">Coqlytics.xyz</Link>
      </div>

      <ul className="basis-4/5 flex gap-7 justify-en">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)

          return (
            <Link
              className={isActive ? 'text-red-400' : 'text-white'}
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
