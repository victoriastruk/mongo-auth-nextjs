'use client'

import { useEffect, useState } from 'react'

const colors = [
  'bg-yellow-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-red-400',
  'bg-blue-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500'
]

function hashStringToNumber (str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

type User = {
  _id: string
  username: string
}

export default function ChatroomMembers () {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/active-users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch active users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
    const interval = setInterval(fetchUsers, 1000)
    return () => clearInterval(interval)
  }, [])

  const usersWithColors = users.map(user => {
    const colorIndex = hashStringToNumber(user.username) % colors.length
    return {
      ...user,
      color: colors[colorIndex]
    }
  })

  return (
    <>
      <h2 className='text-xl font-semibold mb-4'>Chatroom Members</h2>
      {users.length === 0 ? (
        <p className='text-gray-500 text-base'>
          No active users in the last 10 minutes.
        </p>
      ) : (
        <ul className='space-y-4'>
          {usersWithColors.map(user => (
            <li key={user._id} className='flex items-center space-x-3'>
              <span
                className={`inline-block w-3 h-3 rounded-full ${user.color}`}
              ></span>
              <span className='text-lg text-gray-700'>{user.username}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
