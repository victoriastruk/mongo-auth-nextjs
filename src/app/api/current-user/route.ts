import { NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/session'

export async function GET () {
  const userId = await getCurrentUserId()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ userId })
}
