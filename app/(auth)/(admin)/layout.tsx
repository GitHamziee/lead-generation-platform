"use client";

import { SidebarProvider } from "@/components/portal/SidebarContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already verifies auth + ADMIN role.
  // AdminTopBar has its own useSession() for user info.
  // No need to duplicate the check here and block rendering with a spinner.
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar />
        <div className="md:ml-46 flex flex-col min-h-screen">
          <AdminTopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
