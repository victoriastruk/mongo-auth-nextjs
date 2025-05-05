import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { IUser } from './User'
export interface IMessage extends Document {
  userId: Types.ObjectId | IUser 
  message: string
  createdAt: Date
  updatedAt: Date
  chatRoomId?: string | null
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    chatRoomId: { type: String, default: null }
  },
  { timestamps: true }
)

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)

export default Message
