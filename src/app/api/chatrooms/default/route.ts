import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ChatRoom from "@/models/ChatRoom";

export async function GET() {
  await connectDB();

  try {
    const defaultRoom = await ChatRoom.findOne({ creatorId: null }).lean();
    if (!defaultRoom) {
      return NextResponse.json(
        { error: "No default room found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      id: defaultRoom._id.toString(),
      name: defaultRoom.name || "Default Room",
    });
  } catch (error) {
    console.error("Error fetching default room:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
