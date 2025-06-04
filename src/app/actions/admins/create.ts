"use server";
import { connectDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

const CreateAdminSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email."),
  password: z.string().min(3, "Password is required"),
});

export type State = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
export async function createAdmin(prevState: State, formData: FormData) {
  const validatedFields = CreateAdminSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Create Admin.",
    };
  }
  const { username, email, password } = validatedFields.data;
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      email,
      passwordHash: hashedPassword,
    });
    await newAdmin.save();
   } catch (error) {
      console.error("Admin creation failed:", error);
      return {
         message: "Failed to Create Admin",
      };
   }
   revalidatePath("/dashboard/admins");
   redirect("/dashboard/admins");
}
