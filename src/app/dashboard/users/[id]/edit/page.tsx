import Form from "@/app/ui/dashboard/users/EditForm";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

import { fetchUserById } from "@/app/actions/users/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: { id: string } }) {
  const id = props.params.id;
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Edit User",
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form user={user} />
    </main>
  );
}
