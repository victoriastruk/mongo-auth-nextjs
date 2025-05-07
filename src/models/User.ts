import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface User extends Document {
  username: string
  phone: string
  password: string
  lastLoginTime: Date | null
  lastActiveTime: Date | null
  chatRoomId: Types.ObjectId | null
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLoginTime: { type: Date, default: null },
  lastActiveTime: { type: Date, default: null },
  chatRoomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', default: null }
})

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema)

export default User
