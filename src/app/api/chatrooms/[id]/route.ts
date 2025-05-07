import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ChatRoom from '@/models/ChatRoom'
import { getCurrentUserId } from '@/lib/session'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const userId = await getCurrentUserId()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const room = await ChatRoom.findById(params.id)

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  if (room.creatorId.toString() !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await ChatRoom.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
