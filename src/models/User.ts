import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  phone: string
  password: string
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User; 