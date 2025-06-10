import { getCurrentAdminId, getCurrentAdminUsername } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function Page() {
  const userId = await getCurrentAdminId();
  const username = await getCurrentAdminUsername();

  if (!userId || !username) {
    redirect("/dashboard-login");
  }
  return <p>Hi, {username}</p>;
}
