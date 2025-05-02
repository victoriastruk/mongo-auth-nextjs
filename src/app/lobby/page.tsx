import ChatMessages from '../components/ChatMessages/ChatMessages'
import ChatroomMembers from '../components/ChatroomMembers/ChatroomMembers'
import InputMessage from '../components/InputMessage/InputMessage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/session'

export default async function Lobby () {
  const cookie = (await cookies()).get('session')?.value || null

  if (!cookie) {
    redirect('/login')
  }

  const session = await decrypt(cookie)
  const username = session?.username
  if (!session?.userId) {
    redirect('/login')
  }

  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-[1224] h-full bg-white rounded-lg shadow-lg flex'>
        <div className='w-full md:w-2/3  border-gray-200 border-r-2 p-6 flex flex-col justify-between'>
          <ChatMessages />
          <InputMessage />
        </div>
        <ChatroomMembers currentUser={username as string}/>
      </div>
    </div>
  )
}
