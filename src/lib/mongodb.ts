import mongoose from 'mongoose'
import ChatRoom from '@/models/ChatRoom'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  await mongoose.connect(MONGODB_URI)

  await createLobbyRoom()
}

async function createLobbyRoom() {
  const existingLobby = await ChatRoom.findOne({ name: 'Lobby' })

  if (!existingLobby) {
    const lobby = new ChatRoom({
      name: 'Lobby',
      creatorId: null
    })

    await lobby.save()
    console.log('Lobby room created')
  } else {
    console.log('Lobby room already exists')
  }
}