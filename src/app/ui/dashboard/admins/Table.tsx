import { UpdateAdmin, DeleteAdmin } from "@/app/ui/dashboard/admins/Buttons";
import { fetchFilteredAdmins } from "@/app/actions/admins/data";
import { getCurrentAdminId } from "@/lib/session";

interface IAdmin {
  _id: string;
  username: string;
  email: string;
}

export default async function AdminsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const admins: IAdmin[] = await fetchFilteredAdmins(query, currentPage);
  const currentAdminId = await getCurrentAdminId();
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {admins?.map((admin) => (
              <div
                key={admin._id.toString()}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <p>{admin.username}</p>
                </div>
                <p className="text-sm text-gray-500">{admin.email}</p>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateAdmin id={admin._id.toString()} />
                    {currentAdminId !== admin._id.toString() && (
                      <DeleteAdmin id={admin._id.toString()} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left font-normal bg-sky-100">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Username
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {admins?.map((admin) => (
                <tr
                  key={admin._id.toString()}
                  className="w-full border-b border-gray-300 py-3 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{admin.username}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{admin.email}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAdmin id={admin._id.toString()} />
                      {currentAdminId !== admin._id.toString() && (
                        <DeleteAdmin id={admin._id.toString()} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
