'use server'

import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function registerUser (formData: FormData) {
  const username = formData.get('username') as string
  const phone = formData.get('phone') as string
  const password = formData.get('password') as string

  if (!username || !phone || !password) {
    throw new Error('Missing required field')
  }
  await connectDB()
  const existingUser = await User.findOne({ $or: [{ username }, { phone }] })
  if (existingUser) {
    throw new Error('User with this name or phone already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    phone,
    password: hashedPassword
  })
  await newUser.save()
}
