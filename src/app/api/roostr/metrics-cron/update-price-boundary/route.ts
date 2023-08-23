// import { getLastNDaysChiknSalePrices } from '@/utils/chikn-utils'
import { getOutlierBoundary, updateConfig } from '@/utils/common-utils'
import { getLastNDaysRoostrSalePrices } from '@/utils/roostr-utils'
import { NextRequest, NextResponse } from 'next/server'

const DAYS_FOR_BOUNDARY_CALCULATION: number = 30

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const coqKey = searchParams.get('coqKey')

  if (coqKey !== process.env.CRON_COQ_KEY) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 })
  }

  let priceArray = await getLastNDaysRoostrSalePrices(
    DAYS_FOR_BOUNDARY_CALCULATION
  )

  let boundary = getOutlierBoundary(priceArray)

  // console.log('Boundaries', boundaries)
  let configValueToSave = {
    minBoundaryAVAX: boundary.minBoundary,
    maxBoundaryAVAX: boundary.maxBoundary,
  }

  const result = await updateConfig(
    'roostrPriceOutlierBoundary',
    configValueToSave
  )

  if (result.acknowledged) {
    return NextResponse.json(
      { message: 'Roostr Outlier Boundary config updated' },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      { error: 'Could not update Roostr boundaries. Internal error' },
      { status: 500 }
    )
  }
}
