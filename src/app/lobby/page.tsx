import { getCurrentUserId, getCurrentUsername } from "@/lib/session";
import { redirect } from "next/navigation";
import Lobby from "@/app/ui/Lobby/Lobby";

export default async function LobbyPage() {
  const userId = await getCurrentUserId();
  const username = await getCurrentUsername();

  if (!userId || !username) {
    redirect("/login");
  }

  return <Lobby userId={userId} username={username} />;
}
