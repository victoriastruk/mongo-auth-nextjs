function InputMessage () {
  return (
    <div className='mt-6 flex items-center space-x-2'>
      <input
        type='text'
        placeholder='Type a message'
        className='flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm cursor-pointer'>
        Send
      </button>
    </div>
  )
}

export default InputMessage
