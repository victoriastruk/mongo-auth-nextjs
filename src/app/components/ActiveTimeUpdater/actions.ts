'use server'

import { connectDB } from '@/lib/mongodb'
import { getSession } from '@/lib/session'
import User from '@/models/User'

export async function updateLastActiveTime() {
    await connectDB()
    const session = await getSession()
    if (!session?.userId) return
    await User.findByIdAndUpdate(session.userId, {
      lastActiveTime: new Date()
    })
  }