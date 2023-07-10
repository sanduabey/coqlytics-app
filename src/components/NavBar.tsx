import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex p-4 bg-chiknpurple">
      <div className="basis-1/5 justify-start text-white">
        <Link href="/">Coqlytics.xyz</Link>
      </div>

      <ul className="basis-4/5 flex gap-5 justify-end text-white">
        <li className="hover:underline">
          <Link href="chikn"> Chikn</Link>
        </li>
        <li className="hover:underline">
          <Link href="roostr">Roostr</Link>
        </li>
        <li className="hover:underline">
          <Link href="farmland"> FarmLand</Link>
        </li>
        <li className="hover:underline">
          <Link href="blueprint">BluePrint </Link>
        </li>
        <li className="hover:underline">
          <Link href="item"> Item </Link>
        </li>
      </ul>
    </nav>
  )
}
