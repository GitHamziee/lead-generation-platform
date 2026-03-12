"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, Package, Settings, LogOut, X, Send, FileText, Inbox } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Submit Lead", href: "/leads/submit", icon: Send, agentOnly: true },
  { label: "Lead History", href: "/leads/history", icon: FileText, agentOnly: true },
  { label: "My Leads", href: "/my-leads", icon: Inbox, userOnly: true },
  { label: "Packages", href: "/packages", icon: Package, userOnly: true },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const filteredNav = NAV_ITEMS.filter((item) => {
    if (item.userOnly && role !== "USER") return false;
    if (item.agentOnly && role !== "AGENT") return false;
    return true;
  });

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <Image src="/logo.png" alt="R4Referral" width={40} height={40} className="h-[40px] w-[40px] object-contain dark:brightness-0 dark:invert" />
        {/* Close button -- mobile only */}
        <button
          onClick={close}
          className="ml-auto md:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout -- pinned to bottom */}
      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar -- always visible, fixed */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-60">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={close}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-60 md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
