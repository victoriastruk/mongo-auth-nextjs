"use server";
import { connectDB } from "@/lib/mongodb";
import Admin, { IAdmin } from "@/models/Admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const UpdateAdminSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email."),
});
export type State = {
  errors?: {
    username?: string[];
    email?: string[];
  };
  message: string | null;
};

export async function updateAdmin(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UpdateAdminSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update admin.",
    };
  }

  const { username, email } = validatedFields.data;

  try {
    await connectDB();
    await Admin.findByIdAndUpdate(id, {
      username,
      email,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return {
      message: "Failed to update admin.",
    };
  }
  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
}
