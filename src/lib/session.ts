import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}

export async function getCurrentUserId() {
  const session = await getUserSession();
  const userId = session?.userId;
  return userId;
}
export async function getCurrentUsername() {
  const session = await getUserSession();
  const username = session?.username;
  return username;
}

export async function createUserSession(userId: string, username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session_user", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getUserSession() {
  const session = (await cookies()).get("session_user")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
}

export async function createAdminSession(adminId: string, username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: adminId, username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session_admin", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getAdminSession() {
  const session = (await cookies()).get("session_admin")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getCurrentAdminId() {
  const session = await getAdminSession();
  const userId = session?.userId;
  return userId;
}
export async function getCurrentAdminUsername() {
  const session = await getAdminSession();
  const username = session?.username;
  return username;
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_admin");
}