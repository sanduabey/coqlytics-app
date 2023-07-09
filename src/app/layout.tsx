import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// const inter = Inter({ subsets: ['latin'] })

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
      <body className="p-4 flex flex-col min-h-screen bg-blue-900">
        <header>
          <NavBar />
        </header>
        <main className="py-4 grow">{children}</main>
        <footer className="border-t py-3 text-xs text-center">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
