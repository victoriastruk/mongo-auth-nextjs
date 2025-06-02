import { getAllChatRooms } from "../../components/ChatRoomList/actions";

export async function GET() {
  const rooms = await getAllChatRooms();
  return Response.json(rooms);
}
