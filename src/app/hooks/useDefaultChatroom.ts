import { useEffect } from "react";

export default function useDefaultChatroom(
  userId: string | null,
  selectedRoomId: string | null,
  setSelectedRoomId: (id: string) => void,
  setSelectedRoomName: (name: string) => void
) {
  useEffect(() => {
    const fetchDefaultRoom = async () => {
      if (userId && !selectedRoomId) {
        try {
          const res = await fetch("/api/chatrooms/default");
          if (!res.ok) throw new Error("Failed to get default room");
          const data = await res.json();
          setSelectedRoomId(data.id);
          setSelectedRoomName(data.name);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchDefaultRoom();
  }, [userId, selectedRoomId, setSelectedRoomId, setSelectedRoomName]);
}
