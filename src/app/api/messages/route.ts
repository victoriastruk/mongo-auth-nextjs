import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Message from '@/models/Messages'

interface PopulatedMessage {
  _id: string
  message: string
  createdAt: Date
  userId: {
    _id: string
    username: string
  }
}

export async function GET () {
  try {
    const session = await getSession()
    const userId = session?.userId

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .populate('userId', 'username')
      .lean<PopulatedMessage[]>()

    const formatted = messages.map(m => ({
      _id: m._id.toString(),
      message: m.message,
      username: m.userId.username,
      userId: m.userId._id.toString(),
      createdAt: m.createdAt
    }))

    return NextResponse.json(formatted, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/messages:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST (request: Request) {
  const session = await getSession()
  const userId = session?.userId

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message } = await request.json()

  await connectDB()

  const newMessage = await Message.create({ message, userId })
  const populated = (await newMessage.populate(
    'userId',
    'username'
  )) as PopulatedMessage
  await User.findByIdAndUpdate(userId, {
    lastActiveTime: new Date()
  })
  return NextResponse.json(
    {
      _id: populated._id.toString(),
      message: populated.message,
      username: populated.userId.username,
      createdAt: populated.createdAt,
      userId: populated.userId._id.toString()
    },
    { status: 201 }
  )
}
