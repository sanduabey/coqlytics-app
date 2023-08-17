import { getLastNDaysChiknSalePrices } from '@/utils/chikn-utils'
import { updateOutlierConfig, getOutlierBoundaries } from '@/utils/helpers'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const coqKey = searchParams.get('coqKey')

  if (coqKey !== process.env.CRON_COQ_KEY) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 })
  }

  let priceArray = await getLastNDaysChiknSalePrices(30)

  let boundaries = getOutlierBoundaries(priceArray)

  // console.log('Boundaries', boundaries)

  const result = await updateOutlierConfig('chiknOutlierBoundaries', boundaries)

  if (result.acknowledged) {
    return NextResponse.json({ message: 'Outliers updated' }, { status: 200 })
  } else {
    return NextResponse.json(
      { error: 'Could not update quartiles. Internal error' },
      { status: 500 }
    )
  }
}
