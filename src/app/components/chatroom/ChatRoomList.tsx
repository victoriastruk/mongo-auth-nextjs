'use client'

import { useEffect, useState } from 'react'

interface ChatRoom {
  _id: string
  name: string
  creatorId?: { username: string; _id: string }
}

export default function ChatRoomList({
  onSelect,
  selectedRoomId,
  setSelectedRoomId,
  setSelectedRoomName,
}: {
  onSelect: (roomId: string, roomName: string) => void
  selectedRoomId: string | null
  setSelectedRoomId: (id: string | null) => void
  setSelectedRoomName: (name: string) => void
})  {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchChatRooms = async () => {
      const res = await fetch('/api/chatrooms')
      const data = await res.json()
      setChatRooms(data)
    }

    const fetchCurrentUser = async () => {
      const res = await fetch('/api/current-user')
      const data = await res.json()
      setCurrentUserId(data.userId)
    }

    fetchChatRooms()
    fetchCurrentUser()

    const intervalId = setInterval(fetchChatRooms, 5000)
    return () => clearInterval(intervalId)
  }, [])

const deleteChatRoom = async (roomId: string) => {
  if (!currentUserId) return

  const res = await fetch(`/api/chatrooms/${roomId}`, {
    method: 'DELETE',
  })

  const data = await res.json()

  if (data.success) {

    setChatRooms(prevRooms => prevRooms.filter(room => room._id !== roomId))

    if (roomId === selectedRoomId) {
      try {
        const defaultRes = await fetch('/api/chatrooms/default')
        if (!defaultRes.ok) throw new Error('Failed to get default room')

        const defaultRoom = await defaultRes.json()
        setSelectedRoomId(defaultRoom.id)
        setSelectedRoomName(defaultRoom.name)
      } catch (error) {
        console.error('Error while switching to default room:', error)
        setSelectedRoomId(null)
        setSelectedRoomName('No selected.')
      }
    }
  } else {
    alert(data.error)
  }
}

  return (
    <div className='mb-4'>
      <h2 className='text-xl font-semibold mb-4'>Chatrooms</h2>
      <ul className='space-y-2'>
        {chatRooms.map(room => (
          <li key={room._id} className='flex items-center justify-between'>
            <button
              onClick={() => onSelect(room._id, room.name)}
              className='w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer'
            >
              {room.name}
            </button>
            {room.creatorId?._id === currentUserId && (
              <button
                onClick={() => deleteChatRoom(room._id)}
                className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
