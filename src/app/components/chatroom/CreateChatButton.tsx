import { createChatRoom } from '@/app/actions/chatrooms/data'

function CreateChatButton () {
  return (
    <form className='flex gap-1' action={createChatRoom}>
      <input
        className='flex-1 border border-gray-300 rounded px-4 py-2 text-sm'
        type='text'
        name='name'
        placeholder='Chatroom Name'
      />
      <button
        type='submit'
        className='bg-gray-100 hover:bg-gray-300 text-gray-700 px-4 py-2 cursor-pointer rounded'
      >
        Create Chat
      </button>
    </form>
  )
}

export default CreateChatButton
