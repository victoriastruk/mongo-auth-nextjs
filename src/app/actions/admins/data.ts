"use server";
import { connectDB } from "@/lib/mongodb";
import Admin, { IAdmin } from "@/models/Admin";
import { AdminForm } from "@/lib/definitions";
import { ITEMS_PER_PAGE } from "@/constants/config";

export async function fetchAdmins() {
  try {
    await connectDB();
    const admins = await Admin.find().lean();
    return admins.map((admin) => ({
      ...admin,
      _id: admin._id.toString(),
    }));
  } catch (error) {
    console.error("DB Error", error);
    throw new Error("Failed to fetch admins.");
  }
}

export async function fetchFilteredAdmins(
  query: string,
  currentPage: number
): Promise<IAdmin[]> {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const filter = query
    ? {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectDB();

    const admins = await Admin.find(filter)
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ username: 1 })
      .exec();

    return admins;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Failed to fetch admins.");
  }
}

export async function fetchAdminPages(query: string): Promise<number> {
  const filter = query
    ? {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectDB();
    const totalCount = await Admin.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("MongoDB Error", error);
    throw new Error("Failed to fetch total number of admins.");
  }
}

export async function fetchAdminById(id: string): Promise<AdminForm | null> {
  try {
    await connectDB();
    const admin = await Admin.findById(id).lean();

    if (!admin) return null;

    return {
      id: admin._id.toString(),
      username: admin.username,
      email: admin.email,
    };
  } catch (error) {
    console.error("MongoDB Error:", error);
    return null;
  }
}
