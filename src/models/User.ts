import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  phone: string
  password: string
  lastLoginTime: Date | null
  lastActiveTime: Date | null
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLoginTime: { type: Date, default: null },
  lastActiveTime: { type: Date, default: null }
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
