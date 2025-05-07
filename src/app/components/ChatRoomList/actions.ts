'use server'

import { connectDB } from '@/lib/mongodb'
import ChatRoom from '@/models/ChatRoom'

export async function getAllChatRooms () {
  await connectDB()

  const rooms = await ChatRoom.find().populate('creatorId', 'username')
  return rooms.map(room => room.toObject())
}
