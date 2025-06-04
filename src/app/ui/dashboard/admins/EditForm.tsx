"use client";

import { AdminForm } from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/Button";
import { updateAdmin, State } from "@/app/actions/admins/update";
import { useActionState } from "react";

export default function EditAdminForm({ admin }: { admin: AdminForm }) {
  const initialState: State = { message: null, errors: {} };
  const updateAdminWithId = updateAdmin.bind(null, admin.id);
  const [state, formAction] = useActionState(updateAdminWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Username*/}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block font-medium">
            Username
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={admin.username}
                placeholder="Enter username"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 placeholder:text-gray-500"
                aria-describedby="username-error"
              />
            </div>
            <div id="username-error" aria-live="polite" aria-atomic="true">
              {state.errors?.username &&
                state.errors.username.map((error: string) => (
                  <p className="mt-2 text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={admin.email}
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {state.message && (
          <div
            className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {state.message}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/admins"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Admin</Button>
      </div>
    </form>
  );
}
