import Link from 'next/link'

export default function Home () {
  return (
    <header className='flex justify-between items-start min-h-screen bg-gray-100'>
      <Link
        href='/register'
        className='px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
      >
        Sign Up
      </Link>
    </header>
  )
}
