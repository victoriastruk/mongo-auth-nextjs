import Form from "@/app/ui/dashboard/admins/CreateForm";
import { fetchAdmins } from "@/app/actions/admins/data";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export default async function Page() {
  const admins = await fetchAdmins();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Admins", href: "dashboard/admins" },
          {
            label: "Create Admin",
            href: "/dashboard/admins/create",
            active: true,
          },
        ]}
      />
      <Form admins={admins} />
    </main>
  );
}
