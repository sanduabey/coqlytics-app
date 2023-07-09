import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-4 text-center">
        <li>
          <Link href="chikn"> Chikn</Link>
        </li>
        <li>
          <Link href="roostr">Roostr</Link>
        </li>
        <li>
          <Link href="farmland"> FarmLand</Link>
        </li>
        <li>
          <Link href="blueprint">BluePrint </Link>
        </li>
        <li>
          <Link href="item"> Item </Link>
        </li>
      </ul>
    </nav>
  )
}
