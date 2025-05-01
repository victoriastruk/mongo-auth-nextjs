import ChatMessages from '../components/ChatMessages/ChatMessages'
import ChatroomMembers from '../components/ChatroomMembers/ChatroomMembers'
import InputMessage from '../components/InputMessage/InputMessage'

export default function Lobby () {
  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-[1224] h-full bg-white rounded-lg shadow-lg flex'>
        <div className='w-full md:w-2/3  border-gray-200 border-r-2 p-6 flex flex-col justify-between'>
          <ChatMessages />
          <InputMessage />
        </div>
        <ChatroomMembers />
      </div>
    </div>
  )
}
