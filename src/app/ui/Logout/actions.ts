"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { getSession, deleteSession } from "@/lib/session";

export async function logout() {
  const session = await getSession();
  await connectDB();

  if (session?.userId) {
    await User.findByIdAndUpdate(session.userId, {
      lastActiveTime: null,
    });
  }

  await deleteSession();
  redirect("/login");
}
