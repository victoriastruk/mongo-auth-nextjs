import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  await User.findByIdAndUpdate(userId, { lastActiveTime: new Date() });

  return NextResponse.json({ message: "Activity updated" });
}
