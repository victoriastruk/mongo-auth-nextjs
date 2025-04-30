'use server'

import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function getActiveUsers() {
  await connectDB()
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)

  const users = await User.find({
    lastLoginTime: { $gte: tenMinutesAgo }
  })
    .select('username _id')
    .lean()

  return users.map(user => ({
    _id: user._id.toString(),
    username: user.username
  }))
}
