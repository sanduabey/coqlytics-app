const DUMMY_LATEST_SALES = [
  {
    id: 1,
    chiknId: 123,
    soldAt: '2023-04-07T19:34:58.000Z',
    price: 36.95,
    kg: 42,
    rarity: 'nice',
  },
  {
    id: 2,
    chiknId: 124,
    soldAt: '2023-04-17T19:34:58.000Z',
    price: 95,
    kg: 48,
    rarity: 'common',
  },
  {
    id: 3,
    chiknId: 235,
    soldAt: '2023-04-07T19:34:58.000Z',
    price: 369,
    kg: 112,
    rarity: 'rare',
  },
]

export async function GET(request: Request) {
  return new Response(JSON.stringify({ data: DUMMY_LATEST_SALES }))
}
