'use server'

import { connectDB } from '@/lib/mongodb'
import ChatRoom from '@/models/ChatRoom'
import { getCurrentUserId } from '@/lib/session'

export async function createChatRoom (formData: FormData): Promise<void> {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Unauthorized')

  const name = formData.get('name')?.toString()
  if (!name) throw new Error('Chatroom name is required')

  await connectDB()
  await ChatRoom.create({ name, creatorId: userId })
}

export async function getAllChatRooms () {
  await connectDB()

  const rooms = await ChatRoom.find().populate('creatorId', 'username')
  return rooms.map(room => room.toObject())
}