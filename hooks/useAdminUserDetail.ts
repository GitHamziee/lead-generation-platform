"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface CustomPackage {
  id: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
  durationDays: number | null;
  type: string;
  isActive: boolean;
}

export interface UserDetail {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  licenseNo: string | null;
  brokerage: string | null;
  targetAreas: string | null;
  state: string | null;
  accountExecutive: string | null;
  role: string;
  leadCost: number;
  createdAt: string;
  updatedAt: string;
  purchases: {
    id: string;
    status: string;
    expiresAt: string | null;
    createdAt: string;
    package: { name: string; price: number };
  }[];
  customPackage: CustomPackage | null;
}

export function useAdminUserDetail(id: string) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [pendingCancel, setPendingCancel] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [leadCostInput, setLeadCostInput] = useState("");
  const [savingLeadCost, setSavingLeadCost] = useState(false);

  // Custom package state
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customType, setCustomType] = useState<"SUBSCRIPTION" | "PAY_PER_LEAD">("SUBSCRIPTION");
  const [customDuration, setCustomDuration] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customFeatures, setCustomFeatures] = useState("");
  const [savingCustom, setSavingCustom] = useState(false);
  const [deletingCustom, setDeletingCustom] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setLeadCostInput(
            data.user.leadCost > 0
              ? (data.user.leadCost / 100).toFixed(2)
              : ""
          );
          // Initialize custom package form
          if (data.user.customPackage) {
            const cp = data.user.customPackage;
            setCustomName(cp.name);
            setCustomPrice((cp.price / 100).toFixed(2));
            setCustomType(cp.type);
            setCustomDuration(cp.durationDays?.toString() || "");
            setCustomDescription(cp.description || "");
            setCustomFeatures(cp.features.join("\n"));
            setShowCustomForm(true);
          }
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const confirmRoleChange = async () => {
    if (!user || !pendingRole) return;

    setUpdating(true);
    setPendingRole(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: pendingRole }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, role: pendingRole } : prev));
        toast.success("Role updated successfully");
      } else {
        toast.error(data.error || "Failed to update role");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully");
        setNewPassword("");
      } else {
        toast.error(data.error || "Failed to update password");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setChangingPassword(false);
    }
  };

  const confirmCancelSubscription = async () => {
    if (!pendingCancel) return;

    setCancelling(true);
    setPendingCancel(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancelPurchaseId: pendingCancel }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                purchases: prev.purchases.map((p) =>
                  p.id === pendingCancel ? { ...p, status: "CANCELLED" } : p
                ),
              }
            : prev
        );
        toast.success("Subscription cancelled");
      } else {
        toast.error(data.error || "Failed to cancel subscription");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setCancelling(false);
    }
  };

  const saveLeadCost = async () => {
    const dollars = parseFloat(leadCostInput);
    const cents = isNaN(dollars) ? 0 : Math.round(dollars * 100);

    setSavingLeadCost(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadCost: cents }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, leadCost: cents } : prev));
        setLeadCostInput(cents > 0 ? (cents / 100).toFixed(2) : "");
        toast.success("Lead cost updated");
      } else {
        toast.error(data.error || "Failed to update lead cost");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSavingLeadCost(false);
    }
  };

  const saveCustomPackage = async () => {
    if (!customName.trim()) {
      toast.error("Package name is required");
      return;
    }
    const dollars = parseFloat(customPrice);
    if (isNaN(dollars) || dollars < 0) {
      toast.error("Invalid price");
      return;
    }

    setSavingCustom(true);
    try {
      const features = customFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "customPackage",
          name: customName.trim(),
          price: Math.round(dollars * 100),
          description: customDescription.trim() || null,
          features,
          type: customType,
          durationDays: customDuration ? parseInt(customDuration) : null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Custom package saved");
        // Refetch user to get updated customPackage
        const refetch = await fetch(`/api/admin/users/${id}`);
        const refetchData = await refetch.json();
        if (refetch.ok) setUser(refetchData.user);
      } else {
        toast.error(data.error || "Failed to save custom package");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSavingCustom(false);
    }
  };

  const deleteCustomPackage = async () => {
    setDeletingCustom(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "customPackage", subAction: "delete" }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Custom package deleted");
        setUser((prev) => (prev ? { ...prev, customPackage: null } : prev));
        setCustomName("");
        setCustomPrice("");
        setCustomType("SUBSCRIPTION");
        setCustomDuration("");
        setCustomDescription("");
        setCustomFeatures("");
        setShowCustomForm(false);
      } else {
        toast.error(data.error || "Failed to delete custom package");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setDeletingCustom(false);
    }
  };

  const activePurchase = user?.purchases.find((p) => {
    if (p.status !== "ACTIVE") return false;
    if (p.expiresAt && new Date(p.expiresAt) < new Date()) return false;
    return true;
  });

  return {
    user,
    loading,
    updating,
    newPassword,
    setNewPassword,
    changingPassword,
    pendingRole,
    setPendingRole,
    pendingCancel,
    setPendingCancel,
    cancelling,
    activePurchase,
    confirmRoleChange,
    handlePasswordChange,
    confirmCancelSubscription,
    leadCostInput,
    setLeadCostInput,
    savingLeadCost,
    saveLeadCost,
    // Custom package
    customName,
    setCustomName,
    customPrice,
    setCustomPrice,
    customType,
    setCustomType,
    customDuration,
    setCustomDuration,
    customDescription,
    setCustomDescription,
    customFeatures,
    setCustomFeatures,
    savingCustom,
    deletingCustom,
    showCustomForm,
    setShowCustomForm,
    saveCustomPackage,
    deleteCustomPackage,
  };
}
