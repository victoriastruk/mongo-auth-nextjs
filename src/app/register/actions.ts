'use server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { SignupFormSchema, FormState } from '@/lib/definitions'

export async function registerUser (
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    phone: formData.get('phone'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { username, phone, password } = validatedFields.data
  await connectDB()
  const existingUser = await User.findOne({ $or: [{ username }, { phone }] })
  if (existingUser) {
    return {
      errors: {},
      message: 'User with this name or phone already exists'
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    phone,
    password: hashedPassword
  })
  await newUser.save()

  return {
    errors: {},
    message: 'Registration successful!'
  }
}
