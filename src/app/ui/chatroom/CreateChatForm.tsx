"use client";

import { createChatRoom } from "@/app/actions/chatrooms/data";
import { useRef } from "react";

interface Props {
  onClose: () => void;
}

export default function CreateChatForm({ onClose }: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      className="flex flex-col gap-4"
      action={async (formData) => {
        await createChatRoom(formData);
        ref.current?.reset();
        onClose();
      }}
    >
      <input
        className="border border-gray-300 rounded px-4 py-2 text-sm"
        type="text"
        name="name"
        placeholder="Chatroom Name"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 px-4 cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create
        </button>
      </div>
    </form>
  );
}
