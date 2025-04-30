import { getActiveUsers } from './actions'

export default async function Lobby () {
  const users = await getActiveUsers()

  return (
    <div>
      <h2>Active members</h2>
      {users.length === 0 ? (
        <p>No active users in the last 10 minutes.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
