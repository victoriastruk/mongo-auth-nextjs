import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteAdmin } from "@/app/actions/admins/delete";

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
      <button type="submit" className="rounded-md border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
