"use client";

import { UserForm, State } from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { updateUser } from "@/app/actions/users/data";
import { useActionState } from "react";

export default function EditUserForm({ user }: { user: UserForm }) {
  const initialState: State = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Username*/}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block font-medium">
            Choose username
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={user.username}
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
          <label htmlFor="phone" className="mb-2 block font-medium">
            Choose a phone
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                defaultValue={user.phone}
                placeholder="Enter phone"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
                aria-describedby="phone-error"
              />
            </div>
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phone &&
                state.errors.phone.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {state.message && (
          <div
            className={`mt-4 rounded-md border p-4 text-sm ${
              state.message === "User updated successfully."
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
            role="alert"
          >
            {state.message}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit User</Button>
      </div>
    </form>
  );
}
