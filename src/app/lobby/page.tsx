'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import ChatroomMembers from '../components/ChatroomMembers/ChatroomMembers'
import ChatComponent from '../components/ChatComponent/ChatComponent'
import ChatRoomList from '../components/ChatRoomList/ChatRoomList'
import Logout from '../components/Logout/Logout'

export default function Lobby() {
  const router = useRouter()

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [selectedRoomName, setSelectedRoomName] = useState<string>('Lobby')
  const [userId, setUserId] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/session')
        const data = await res.json()

        if (!data?.userId || !data?.username) {
          router.push('/login')
        } else {
          setUserId(data.userId)
          setUsername(data.username)
        }
      } catch (error) {
        console.error('Failed to fetch session:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [router])

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    )
  }

  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-[1224px] h-full bg-white rounded-lg shadow-lg flex'>
        <div className='w-full md:w-2/3 border-gray-200 border-r-2 p-6 flex flex-col justify-between'>
          {userId && <ChatComponent currentUserId={userId} selectedRoomId={selectedRoomId} selectedRoomName={selectedRoomName} />}
        </div>
        <aside className='w-1/3 p-6'>
          <div className='flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200'>
            <span className='text-xl font-medium text-gray-700'>
              {username}
            </span>
            <Logout />
          </div>
          <ChatRoomList onSelect={(chatRoomId, name) => {
            setSelectedRoomId(chatRoomId)
            setSelectedRoomName(name)
          }} />
          <ChatroomMembers />
        </aside>
      </div>
    </div>
  )
}
