import { getLastNDaysChiknSalePrices } from '@/utils/chikn-utils'
import { updateOutlierConfig } from '@/utils/common-utils'
import { getOutlierBoundary } from '@/utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

const DAYS_FOR_BOUNDARY_CALCULATION: number = 30

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const coqKey = searchParams.get('coqKey')

  if (coqKey !== process.env.CRON_COQ_KEY) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 })
  }

  let priceArray = await getLastNDaysChiknSalePrices(
    DAYS_FOR_BOUNDARY_CALCULATION
  )

  let boundary = getOutlierBoundary(priceArray)

  // console.log('Boundaries', boundaries)
  let configValueToSave = {
    minBoundaryAVAX: boundary.minBoundary,
    maxBoundaryAVAX: boundary.maxBoundary,
  }

  const result = await updateOutlierConfig(
    'chiknPriceOutlierBoundary',
    configValueToSave
  )

  if (result.acknowledged) {
    return NextResponse.json({ message: 'Outliers updated' }, { status: 200 })
  } else {
    return NextResponse.json(
      { error: 'Could not update quartiles. Internal error' },
      { status: 500 }
    )
  }
}
