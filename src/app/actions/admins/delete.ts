"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function deleteAdmin(id: string) {
  await connectDB();
  await Admin.findByIdAndDelete(id);

  revalidatePath("/dashboard/admins");
}
