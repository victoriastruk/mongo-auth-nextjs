"use server";
import { connectDB } from "@/lib/mongodb";
import { UserForm, State } from "@/lib/definitions";

import User, { IUser } from "@/models/User";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ITEMS_PER_PAGE } from "@/constants/config";

const UpdateUser = z.object({
  username: z.string().min(1, "Username is required"),
  phone: z.string().min(1, "Phone is required"),
});

export async function fetchFilteredUsers(
  query: string,
  currentPage: number
): Promise<IUser[]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const filter = query
    ? {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectDB();

    const users = await User.find(filter)
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ username: 1 })
      .exec();

    return users;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUsersPages(query: string): Promise<number> {
  const filter = query
    ? {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectDB();
    const totalCount = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Failed to fetch total number of users.");
  }
}


export async function fetchUserById(id: string): Promise<UserForm | null> {
  try {
    await connectDB();
    const user = await User.findById(id).lean();

    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      phone: user.phone,
    };
  } catch (error) {
    console.error("MongoDB Error:", error);
    return null;
  }
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UpdateUser.safeParse({
    username: formData.get("username"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update user.",
    };
  }

  const { username, phone } = validatedFields.data;

  try {
    await connectDB();
    await User.findByIdAndUpdate(id, {
      username,
      phone,
    });

    revalidatePath("/dashboard/users");

    return { message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      message: "Something went wrong. Failed to update user.",
    };
  }
}

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndDelete(id);

  revalidatePath("/dashboard/users");
}
