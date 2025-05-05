import ChatroomMembers from '../components/ChatroomMembers/ChatroomMembers'
import ChatComponent from '../components/ChatComponent/ChatComponent'
import { getSession } from '@/lib/session'

export default async function Lobby () {
  const session = await getSession()
  const username = session?.username as string
  const userId = session?.userId as string

  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-[1224] h-full bg-white rounded-lg shadow-lg flex'>
        <div className='w-full md:w-2/3  border-gray-200 border-r-2 p-6 flex flex-col justify-between'>
          <ChatComponent currentUserId={userId} />
        </div>
        <ChatroomMembers currentUser={username} />
      </div>
    </div>
  )
}
