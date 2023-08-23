import getDb from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  try {
    const db = await getDb()

    const result = await db.collection('configs').findOne({
      key: 'roostrPriceOutlierBoundary',
    })

    // console.log(result)

    if (result) {
      return NextResponse.json(
        {
          data: result.value,
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          error: 'Price outlier boundary cannot be fetched',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    throw error
  }
}
