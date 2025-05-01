'use server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

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

  user.lastLoginTime = new Date()
  await user.save()

  return {
    username: user.username
  }
}
