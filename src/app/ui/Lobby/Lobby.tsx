"use client";

import { useState } from "react";

import useUserActivity from "@/app/hooks/useUserActivity";
import useDefaultChatroom from "@/app/hooks/useDefaultChatroom";

import ChatroomMembers from "../chatroom/ChatroomMembers";
import Messages from "../Messages/Messages";
import ChatRoomList from "../chatroom/ChatRoomList";
import Logout from "../Logout/Logout";

type LobbyProps = {
  userId: string;
  username: string;
};

export default function Lobby({ userId, username }: LobbyProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string>("Lobby");

  useUserActivity(userId);
  useDefaultChatroom(
    userId,
    selectedRoomId,
    setSelectedRoomId,
    setSelectedRoomName
  );

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[1224px] h-full bg-white rounded-lg shadow-lg flex">
        <div className="w-full md:w-2/3 border-gray-200 border-r-2 p-6 flex flex-col justify-between">
          <Messages
            currentUserId={userId}
            selectedRoomId={selectedRoomId}
            selectedRoomName={selectedRoomName}
          />
        </div>
        <aside className="w-1/3 p-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200">
            <span className="text-xl font-medium text-gray-700">
              {username}
            </span>
            <Logout />
          </div>
          <ChatRoomList
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
            setSelectedRoomName={setSelectedRoomName}
            onSelect={(chatRoomId, name) => {
              setSelectedRoomId(chatRoomId);
              setSelectedRoomName(name);
            }}
          />
          <ChatroomMembers />
        </aside>
      </div>
    </div>
  );
}
