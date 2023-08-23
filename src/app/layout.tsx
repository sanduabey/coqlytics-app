import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coqlytics',
  description: 'Analytics of Chikn NFT Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-chiknpurple-dark">
        <header>
          <NavBar />
        </header>
        <main className="py-4 grow">{children}</main>
        <footer className="border-t py-3 text-xs ">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
