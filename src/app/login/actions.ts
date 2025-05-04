'use server'
import { connectDB } from '@/lib/mongodb'
import User, { IUser } from '@/models/User'
import bcrypt from 'bcryptjs'
import { createSession } from '@/lib/session'

async function updateUserTimes (user: IUser) {
  const now = new Date()
  await User.findByIdAndUpdate(user._id, {
    lastLoginTime: now,
    lastActiveTime: now
  })
}

export async function loginUser (formData: FormData) {
  const login = formData.get('login') as string
  const password = formData.get('password') as string

  if (!login || !password) {
    throw new Error('Missing required field')
  }

  try {
    await connectDB()
    const user = await User.findOne({
      $or: [{ username: login }, { phone: login }]
    })
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Invalid password')
    }

    await createSession(user.id, user.username)
    await updateUserTimes(user)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`)
    }
    throw new Error('An unknown error occured')
  }
}
