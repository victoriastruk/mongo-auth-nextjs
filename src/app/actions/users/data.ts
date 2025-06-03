"use server";
import { connectDB } from "@/lib/mongodb";

import User, { IUser } from "@/models/User"; 
import { revalidatePath } from "next/cache";

const ITEMS_PER_PAGE = 6;

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

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndDelete(id);

  revalidatePath("/dashboard/users");
}
