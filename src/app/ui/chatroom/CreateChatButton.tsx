"use client";
import { useState } from "react";
import CreateChatForm from "./CreateChatForm";

export default function CreateChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Create Chat
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">New Chatroom</h2>
            <CreateChatForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
