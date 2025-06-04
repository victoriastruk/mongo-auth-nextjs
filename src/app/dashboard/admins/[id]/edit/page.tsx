import Form from "@/app/ui/dashboard/admins/EditForm";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

import { fetchAdminById } from "@/app/actions/admins/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const admin = await fetchAdminById(id);

  if (!admin) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Admins", href: "/dashboard/admins" },
          {
            label: "Edit Admin",
            href: `/dashboard/admins/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form admin={admin} />
    </main>
  );
}
