"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PackageRow {
  id: string;
  name: string;
  price: number;
  type: "SUBSCRIPTION" | "PAY_PER_LEAD";
  isActive: boolean;
  sortOrder: number;
  _count: { purchases: number };
}

export function useAdminPackages() {
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingTypeId, setSavingTypeId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();
        if (res.ok) setPackages(data.packages);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const startEdit = useCallback((pkg: PackageRow) => {
    setEditingId(pkg.id);
    setEditPrice((pkg.price / 100).toFixed(2));
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditPrice("");
  }, []);

  const savePrice = useCallback(
    async (id: string) => {
      const cents = Math.round(parseFloat(editPrice) * 100);
      if (isNaN(cents) || cents < 0) return;

      setSaving(true);
      try {
        const res = await fetch("/api/admin/packages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, price: cents }),
        });
        if (res.ok) {
          setPackages((prev) =>
            prev.map((p) => (p.id === id ? { ...p, price: cents } : p))
          );
          setEditingId(null);
          setEditPrice("");
        }
      } catch {
        // silently fail
      } finally {
        setSaving(false);
      }
    },
    [editPrice]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter") savePrice(id);
      if (e.key === "Escape") cancelEdit();
    },
    [savePrice, cancelEdit]
  );

  const toggleType = useCallback(async (pkg: PackageRow) => {
    const newType = pkg.type === "SUBSCRIPTION" ? "PAY_PER_LEAD" : "SUBSCRIPTION";
    setSavingTypeId(pkg.id);
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pkg.id, type: newType }),
      });
      if (res.ok) {
        setPackages((prev) =>
          prev.map((p) => (p.id === pkg.id ? { ...p, type: newType } : p))
        );
      }
    } catch {
      // silently fail
    } finally {
      setSavingTypeId(null);
    }
  }, []);

  return {
    packages,
    loading,
    editingId,
    editPrice,
    saving,
    savingTypeId,
    inputRef,
    setEditPrice,
    startEdit,
    cancelEdit,
    savePrice,
    handleKeyDown,
    toggleType,
  };
}
