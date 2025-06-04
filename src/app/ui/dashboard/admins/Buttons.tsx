import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteAdmin } from "@/app/actions/admins/delete";

export function CreateAdmin() {
  return (
    <Link
      href="/dashboard/admins/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Admin</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAdmin({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/admins/${id}/edit`}
      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAdmin({ id }: { id: string }) {
  const deleteUserWithId = deleteAdmin.bind(null, id);

  return (
    <form action={deleteUserWithId}>
      <button
        type="submit"
        className="rounded-md border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
