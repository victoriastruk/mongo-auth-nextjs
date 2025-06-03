import { getAllChatRooms } from "@/app/actions/chatrooms/data";

export async function GET() {
  const rooms = await getAllChatRooms();
  return Response.json(rooms);
}
