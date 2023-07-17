import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex p-4 bg-chiknpurple">
      <div className="basis-1/5 justify-start text-white">
        <Link href="/">Coqlytics.xyz</Link>
      </div>

      <ul className="basis-4/5 flex gap-7 justify-end text-white">
        <li className="hover:underline">
          <Link href="chikns"> Chikns</Link>
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
        </li>
      </ul>
    </nav>
  )
}
