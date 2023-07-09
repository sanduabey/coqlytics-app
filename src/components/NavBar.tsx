import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li className="text-blue-300 hover:underline">
          <Link href="chikn"> Chikn</Link>
        </li>
        <li className="text-blue-300 hover:underline">
          <Link href="roostr">Roostr</Link>
        </li>
        <li className="text-blue-300 hover:underline">
          <Link href="farmland"> FarmLand</Link>
        </li>
        <li className="text-blue-300 hover:underline">
          <Link href="blueprint">BluePrint </Link>
        </li>
        <li className="text-blue-300 hover:underline">
          <Link href="item"> Item </Link>
        </li>
      </ul>
    </nav>
  )
}
