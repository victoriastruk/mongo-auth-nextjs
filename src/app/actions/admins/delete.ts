"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdminId } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function deleteAdmin(id: string) {
  try {
    await connectDB();

    const currentAdminId = await getCurrentAdminId();

    if (id === currentAdminId) {
      throw new Error("You cannot delete yourself.");
    }
    await Admin.findByIdAndDelete(id);
    revalidatePath("/dashboard/admins");

    return { success: true };
  } catch (error) {
    console.error("Error while removing administrator", error);
    return { success: false, error: (error as Error).message };
  }
}
