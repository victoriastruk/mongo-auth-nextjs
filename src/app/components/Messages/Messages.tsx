"use client";

import { useEffect, useRef, useState } from "react";
import CreateChatButton from "../CreateChatButton/CreateChatButton";

async function sendMessageToServer(message: string, chatRoomId: string | null) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      chatRoomId,
    }),
  });
  const data = await response.json();
  return data;
}

type Message = {
  _id: string;
  message: string;
  username: string;
  userId: string;
  createdAt: string;
};

type MessageFromServer = {
  _id: string;
  message: string;
  userId: {
    username: string;
    _id: string;
  };
  createdAt: string;
};

export default function Messages({
  currentUserId,
  selectedRoomId,
  selectedRoomName,
}: {
  currentUserId: string;
  selectedRoomId: string | null;
  selectedRoomName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function fetchMessages() {
    if (!selectedRoomId) {
      setMessages([]);
      return;
    }
    const url = `/api/messages?chatRoomId=${selectedRoomId}`;

    const res = await fetch(url);
    const data: MessageFromServer[] = await res.json();

    const formattedMessages: Message[] = data.map((m) => ({
      _id: m._id,
      message: m.message,
      username: m.userId.username,
      userId: m.userId._id,
      createdAt: m.createdAt,
    }));
    setMessages(formattedMessages);
  }

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };

    loadMessages();

    const interval = setInterval(loadMessages, 1000);

    return () => clearInterval(interval);
  }, [selectedRoomId]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const isNearBottom =
      chatContainer.scrollHeight - chatContainer.scrollTop <=
      chatContainer.clientHeight + 100;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = await sendMessageToServer(newMessage, selectedRoomId);
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="overflow-y-auto flex flex-col flex-1 pr-2">
      <div className="flex justify-between border-b-2 border-gray-200 mb-4 pb-4">
        <h2 className="text-2xl font-semibold">Room: {selectedRoomName}</h2>
        <CreateChatButton />
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-2"
      >
        <ul className="flex flex-col justify-end flex-1 space-y-4">
          {messages.map((m) => {
            const isCurrentUser = m.userId === currentUserId;
            return (
              <li
                key={m._id}
                className={`flex flex-col max-w-[70%] ${
                  isCurrentUser
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="font-semibold mr-2">{m.username}</span>
                  <span>
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg w-fit ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.message}
                </div>
              </li>
            );
          })}
          <div ref={bottomRef} />
        </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={({ target: { value } }) => setNewMessage(value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}
