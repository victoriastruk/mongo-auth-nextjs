function ChatMessages () {
  return (
    <div className='overflow-y-auto flex flex-col flex-1 pr-2'>
      <h2 className='text-2xl font-semibold mb-4  pb-4 border-b-2 border-gray-200'>Chat</h2>
      <div className='flex flex-col justify-end flex-1 space-y-4'>
        <div className='self-start'>
          <div className='bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-fit'>
            Hello!
          </div>
        </div>
        <div className='self-end'>
          <div className='bg-blue-500 text-white px-4 py-2 rounded-lg w-fit'>
            Hi there!
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessages
