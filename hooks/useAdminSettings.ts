"use client";

import { useState, useEffect, useCallback } from "react";

export interface AdminSettings {
  hidePages: boolean;
  contactEmail: string;
  updatedAt?: string;
}

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (!cancelled && res.ok) setSettings(data.settings);
        else if (!cancelled) setError(data.error || "Failed to load settings");
      } catch {
        if (!cancelled) setError("Failed to load settings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleHidePages = useCallback(async () => {
    if (!settings) return;
    const next = !settings.hidePages;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidePages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update settings");
      setSettings(data.settings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update settings");
    } finally {
      setSaving(false);
    }
  }, [settings]);

  return { settings, loading, saving, error, toggleHidePages };
}
