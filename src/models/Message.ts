import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { ChatRoom } from './ChatRoom'

export interface Message extends Document {
  userId: Types.ObjectId | { _id: Types.ObjectId; username: string }
  message: string
  createdAt: Date
  updatedAt: Date
  chatRoomId?: Types.ObjectId | ChatRoom | null
}
const MessageSchema = new Schema<Message>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    chatRoomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', default: null }
  },
  { timestamps: true }
)

const Message: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema)

export default Message
