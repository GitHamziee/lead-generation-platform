"use client";

import { useState, useEffect, useCallback } from "react";

export interface AgentRow {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  _count: { agentLeads: number };
}

interface CreateForm {
  name: string;
  email: string;
  password: string;
}

export function useAdminAgents() {
  const [agents, setAgents] = useState<AgentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateForm>({ name: "", email: "", password: "" });

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/agents");
      const data = await res.json();
      if (res.ok) setAgents(data.agents);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const setField = (field: keyof CreateForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(false);
  };

  const createAgent = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }
    setCreating(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create account.");
        return;
      }
      setSuccess(true);
      setForm({ name: "", email: "", password: "" });
      await fetchAgents();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return {
    agents,
    loading,
    creating,
    success,
    error,
    form,
    setField,
    createAgent,
  };
}
