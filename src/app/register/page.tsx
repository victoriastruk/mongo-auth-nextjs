// // 'use client'

// import { useState } from 'react'
// import { registerUser } from './actions'

// export default function RegisterForm () {
//   const [username, setUsername] = useState('')
//   const [phone, setPhone] = useState('')
//   const [password, setPassword] = useState('')
//   const [isError, setIsError] = useState(false)
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const formData = new FormData()
//     formData.append('username', username)
//     formData.append('phone', phone)
//     formData.append('password', password)

//     try {
//       await registerUser(formData)
//       setIsError(false)
//       setMessage('Registration successful!')
//       setUsername('')
//       setPhone('')
//       setPassword('')
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setIsError(true)
//         setMessage(error.message)
//       } else {
//         setIsError(true)
//         setMessage('Registration failed. Please try again.')
//       }
//     }
//   }
//   return (
//     <main className='min-h-screen flex items-center justify-center bg-gray-100'>
//       <div className='flex flex-col justify-center bg-white px-6 py-12 rounded-lg  shadow-md sm:max-w-sm w-full'>
//         <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 mb-8'>
//           Sign up
//         </h2>
//         <form onSubmit={handleSubmit} className='space-y-4'>
//           <input
//             type='text'
//             placeholder='Username'
//             value={username}
//             onChange={({ target: { value } }) => setUsername(value)}
//             required
//             className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
//           />

//           <input
//             type='tel'
//             placeholder='Phone'
//             value={phone}
//             onChange={({ target: { value } }) => setPhone(value)}
//             required
//             className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
//           />

//           <input
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={({ target: { value } }) => setPassword(value)}
//             required
//             className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
//           />
//           <button
//             type='submit'
//             className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
//           >
//             Sign up
//           </button>
//         </form>
//         {message && (
//           <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </main>
//   )
// }
'use client'
import { registerUser } from './actions'
import { useActionState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormState } from '@/lib/definitions'

const initialFormState: FormState = { errors: {} }

export default function SignupForm () {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    registerUser,
    initialFormState
  )
  const router = useRouter()

  useEffect(() => {
    if (state?.message === 'Registration successful!') {
      const timeout = setTimeout(() => {
        router.push('/login')
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [state?.message, router])
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col justify-center bg-white px-6 py-12 rounded-lg  shadow-md sm:max-w-sm w-full'>
        <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 mb-8'>
          Sign up
        </h2>
        <form action={formAction} className='space-y-4'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          {state?.errors?.username && (
            <p className='mt-4 text-red-500'>{state.errors.username}</p>
          )}
          <input
            type='tel'
            name='phone'
            placeholder='Phone'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          {state?.errors?.phone && (
            <p className='mt-4 text-red-500'>{state.errors.phone}</p>
          )}
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          {state?.errors?.password && (
            <div>
              <p className='mt-4 text-red-500'>Password must:</p>
              <ul>
                {state.errors.password.map(error => (
                  <li className='mt-4 text-red-500' key={error}>
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type='submit'
            disabled={pending}
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
          >
            Sign up
          </button>
        </form>
        {state?.message && (
          <p
            className={`mt-4 ${
              state.message === 'Registration successful!'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </main>
  )
}
