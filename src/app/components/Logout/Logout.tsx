import { logout } from './actions'

function Logout () {
  return (
    <form action={logout}>
      <button
        type='submit'
        className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 cursor-pointer rounded'
      >
        Logout
      </button>
    </form>
  )
}

export default Logout
