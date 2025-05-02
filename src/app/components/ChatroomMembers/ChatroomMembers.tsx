import { getActiveUsers } from './actions'
import { logout } from './actions'

export default async function ChatroomMembers ({
  currentUser
}: {
  currentUser: string
}) {
  const users = await getActiveUsers()

  const usersWithColors = users.map(user => {
    const colorIndex = hashStringToNumber(user.username) % colors.length
    return {
      ...user,
      color: colors[colorIndex]
    }
  })

  return (
    <aside className='w-1/3 p-6'>
      <div className='flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200'>
        <span className='text-xl font-medium text-gray-700'>{currentUser}</span>
        <form action={logout}>
          <button
            type='submit'
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 cursor-pointer rounded'
          >
            Logout
          </button>
        </form>
      </div>
      <h2 className='text-2xl font-semibold mb-4'>Chatroom Members</h2>
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
    </aside>
  )
}

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
