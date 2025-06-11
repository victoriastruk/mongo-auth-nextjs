import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";
import User from "@/models/User";
import Message from "@/models/Message";

interface PopulatedMessage {
  _id: string;
  message: string;
  createdAt: Date;
  userId: {
    _id: string;
    username: string;
  };
}
export async function GET(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const chatRoomId = url.searchParams.get("chatRoomId");

  try {
    let filter = {};

    if (chatRoomId) {
      if (Types.ObjectId.isValid(chatRoomId)) {
        filter = { chatRoomId };
      } else {
        return NextResponse.json(
          { error: "Invalid chatRoomId" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json([], { status: 200 });
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: 1 })
      .populate({ path: "userId", select: "username" })
      .lean();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, chatRoomId } = await request.json();

  await connectDB();

  const newMessage = await Message.create({
    message,
    userId,
    chatRoomId: chatRoomId,
  });

  const populated = (await newMessage.populate(
    "userId",
    "username"
  )) as PopulatedMessage;

  await User.findByIdAndUpdate(userId, {
    lastActiveTime: new Date(),
  });

  return NextResponse.json(
    {
      _id: populated._id.toString(),
      message: populated.message,
      username: populated.userId.username,
      createdAt: populated.createdAt,
      userId: populated.userId._id.toString(),
    },
    { status: 201 }
  );
}
