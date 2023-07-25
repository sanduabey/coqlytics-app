import { NextRequest, NextResponse } from 'next/server'

const getBestVauleChikensForSale = async () => {
  const chikenForSale = await fetch(
    'https://api.chikn.farm/api/chikn/list?page=1&limit=16&filter=forSale=true&projection=token&projection=kg&projection=salePrice&projection=eggPerDay&projection=lastClaimedEgg',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const chikns = await chikenForSale.json()

  console.log(chikns)
  return chikns
}

export async function GET(request: NextRequest) {
  let result = await getBestVauleChikensForSale()

  return NextResponse.json({ data: result })
}
