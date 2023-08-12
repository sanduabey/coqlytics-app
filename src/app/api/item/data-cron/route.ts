import { startItemDataCron } from '@/utils/item-utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const coqKey = searchParams.get('coqKey')

  if (coqKey !== process.env.CRON_COQ_KEY) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 })
  }

  try {
    const res = await startItemDataCron()

    if (res === 'DONE') {
      return NextResponse.json(
        { message: 'Item data cron successfully finished.' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Could not complete data cron. Something went wrong' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Could not complete data cron. Interneal server error' },
      { status: 500 }
    )
  }
}
