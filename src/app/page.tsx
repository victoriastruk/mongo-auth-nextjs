import { FormEvent } from 'react'

export default function RegisterForm () {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col justify-center bg-white px-6 py-12 rounded-lg  shadow-md sm:max-w-sm w-full'>
        <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 mb-8'>
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />

          <input
            type='tel'
            name='phone'
            id='phone'
            placeholder='Phone'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />

          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  )
}
