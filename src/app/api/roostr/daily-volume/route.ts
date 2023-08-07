import { getRoostrSalesByDate } from '@/utils/roostr-utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const _from = searchParams.get('from')
  const _to = searchParams.get('to')

  if (_from === null || _to === null) {
    return NextResponse.json(
      { error: 'Bad Request! "from" and "to" query params needed.' },
      { status: 400 }
    )
  }

  let fromDate = new Date(_from)
  let toDate = new Date(_to)
  let result = await getRoostrSalesByDate(fromDate, toDate)

  return NextResponse.json({ data: result }, { status: 200 })
}
