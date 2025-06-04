"use server";
import { connectDB } from "@/lib/mongodb";
import Admin, { IAdmin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing required field");
  }

  try {
    await connectDB();
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    await createSession(admin.id, admin.username);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unknown error occured");
  }
}
