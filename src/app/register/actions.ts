// 'use server'

// import { connectDB } from '@/lib/mongodb'
// import User from '@/models/User'
// import bcrypt from 'bcryptjs'

// export async function registerUser (formData: FormData) {
//   const username = formData.get('username') as string
//   const phone = formData.get('phone') as string
//   const password = formData.get('password') as string

//   if (!username || !phone || !password) {
//     throw new Error('Missing required field')
//   }
//   await connectDB()
//   const existingUser = await User.findOne({ $or: [{ username }, { phone }] })
//   if (existingUser) {
//     throw new Error('User with this name or phone already exists')
//   }
//   const hashedPassword = await bcrypt.hash(password, 10)

//   const newUser = new User({
//     username,
//     phone,
//     password: hashedPassword
//   })
//   await newUser.save()
// }
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
  //   return { success: true }
  return {
    errors: {},
    message: 'Registration successful!'
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
