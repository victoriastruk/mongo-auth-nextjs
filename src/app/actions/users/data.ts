"use server";
import { connectDB } from "@/lib/mongodb";

import User, { IUser } from "@/models/User"; // або звідки імпортуєш модель
import { revalidatePath } from "next/cache";

const ITEMS_PER_PAGE = 6;

// Функція для пошуку користувачів з пагінацією
export async function fetchFilteredUsers(
  query: string,
  currentPage: number
): Promise<IUser[]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Побудова фільтра для пошуку по username або phone (регістронезалежно)
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
      .sort({ username: 1 }) // сортування за username за зростанням (можна змінити)
      .exec();

    return users;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

// Функція для отримання кількості сторінок з урахуванням фільтра
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
