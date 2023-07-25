import Link from 'next/link'

export default function ChiknLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      Chikn Layout
      <nav className="text-white">
        <ul className="flex gap-4 justify-center">
          <Link href="/chikn">Market</Link>
          <Link href="/chikn/sniper">Sniper</Link>
        </ul>
      </nav>
      {children}
    </>
  )
}
