import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { User } from './User'

export interface ChatRoom extends Document {
  name: string
  creatorId: Types.ObjectId | User
  createdAt: Date
  updatedAt: Date
}

const ChatRoomSchema = new Schema<ChatRoom>(
  {
    name: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

const ChatRoom: Model<ChatRoom> =
  mongoose.models.ChatRoom ||
  mongoose.model<ChatRoom>('ChatRoom', ChatRoomSchema)

export default ChatRoom
