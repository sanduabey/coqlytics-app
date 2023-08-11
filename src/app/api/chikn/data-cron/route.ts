import { downloadAllNFTSalesFromContract } from '@/utils/chikn-utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  //check key
  try {
    const res = await downloadAllNFTSalesFromContract()

    if (res) {
      return NextResponse.json(
        { message: 'Chikn data cron complete' },
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
