import React from 'react'

export default function page () {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col justify-center bg-white px-6 py-12 rounded-lg  shadow-md sm:max-w-sm w-full'>
        <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 mb-8'>
          Sign In
        </h2>
        <form className='space-y-4'>
          <input
            type='text'
            placeholder='Username or phone'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          <input
            type='password'
            placeholder='Password'
            required
            className='block w-full bg-white border border-gray-300 text-base text-gray-900 placehplder:text-gray-400 px-3 py-2 rounded-md focus:border-indigo-500 sm:text-sm'
          />
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
