'use server'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { createSession } from '@/lib/session'

export async function loginUser (formData: FormData) {
  const login = formData.get('login') as string
  const password = formData.get('password') as string

  if (!login || !password) {
    throw new Error('Missing required field')
  }

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
  user.lastLoginTime = new Date()
  user.lastActiveTime = new Date()
  await user.save()

  redirect('/lobby')
}
