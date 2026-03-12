"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Users, Package, LogOut, X, ArrowLeft, FileText, CreditCard, BarChart3, Headset } from "lucide-react";
import { useSidebar } from "@/components/portal/SidebarContext";

const NAV_ITEMS = [
  { label: "Clients", href: "/admin/users", icon: Users },
  { label: "QA", href: "/admin/agents", icon: Headset },
  { label: "Leads", href: "/admin/leads", icon: FileText },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-slate-700/50">
        <Image src="/logo.png" alt="R4Referral" width={40} height={40} className="h-[40px] w-[40px] object-contain brightness-0 invert" />
        <button
          onClick={close}
          className="ml-auto md:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-700/60 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-slate-700/50 space-y-1">
        <Link
          href="/dashboard?portal"
          className="flex w-full items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          Back to Portal
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-38">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={close}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-38 md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
