'use client'
import AllCollectionVolChartSection from '@/components/home/AllCollectionVolChartSection'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

const initialToDate = new Date()
const initialFromDate = new Date()
initialFromDate.setDate(initialToDate.getDate() - 30)

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="">
          <h1 className="text-red-500">coqlytics.xyz</h1>

          <AllCollectionVolChartSection />
        </main>
      </QueryClientProvider>
    </>
  )
}
