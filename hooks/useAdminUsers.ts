"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  purchases: { package: { name: string } }[];
  _count: { assignedLeads: number };
}

interface Stats {
  totalUsers: number;
  admins: number;
  agents: number;
  activeSubs: number;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, admins: 0, agents: 0, activeSubs: 0 });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(roleFilter && { role: roleFilter }),
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function changeSearch(value: string) {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
  }

  function changeRoleFilter(value: string) {
    setRoleFilter(value);
    setPage(1);
  }

  return {
    users,
    total,
    totalUsers: stats.totalUsers,
    page,
    totalPages,
    search,
    roleFilter,
    loading,
    admins: stats.admins,
    agents: stats.agents,
    withSubs: stats.activeSubs,
    setPage,
    setSearch: changeSearch,
    setRoleFilter: changeRoleFilter,
  };
}
