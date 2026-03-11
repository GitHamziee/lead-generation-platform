"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Headset,
  Calendar,
  Package,
  CreditCard,
  Clock,
  Lock,
  MapPin,
  Building2,
  FileText,
  Target,
  UserCheck,
  DollarSign,
  Sparkles,
  Trash2,
  Plus,
} from "lucide-react";
import { US_STATE_MAP } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminUserDetail } from "@/hooks/useAdminUserDetail";
import { formatShortDateMST, formatShortDateNoYearMST } from "@/lib/format-utils";

function getInitials(name: string | null) {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return "?";
}

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
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
  } = useAdminUserDetail(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-0">
        <div className="h-5 w-28 bg-slate-100 dark:bg-slate-700 rounded mb-6 animate-pulse" />
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-700" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-100 dark:bg-slate-700 rounded" />
              <div className="h-4 w-56 bg-slate-50 dark:bg-slate-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 dark:text-slate-400">User not found</p>
        <Link
          href="/admin/users"
          className="text-sm text-brand-600 hover:text-brand-700 mt-2 inline-block"
        >
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      {/* Profile header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur text-white text-lg sm:text-xl font-bold ring-2 ring-white/20 shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {user.name || "Unnamed User"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Role
            </p>
            <div className="flex items-center gap-1.5">
              {user.role === "ADMIN" ? (
                <Shield className="h-3.5 w-3.5 text-amber-500" />
              ) : user.role === "AGENT" ? (
                <Headset className="h-3.5 w-3.5 text-blue-500" />
              ) : null}
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                {user.role === "ADMIN" ? "Admin" : user.role === "AGENT" ? "QA" : "Client"}
              </span>
            </div>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Phone
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user.phone || "\u2014"}
            </p>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Joined
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {formatShortDateMST(user.createdAt)}
            </p>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold ${
                activePurchase
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}
            >
              {activePurchase ? "Subscribed" : "No Plan"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono truncate max-w-full">
            ID: {user.id}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Role:</span>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-1">
              {[
                { label: "Client", value: "USER" },
                { label: "QA", value: "AGENT" },
                { label: "Admin", value: "ADMIN" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPendingRole(opt.value)}
                  disabled={updating || user.role === opt.value}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    user.role === opt.value
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60"
                  } disabled:cursor-default`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      {(user.state || user.targetAreas || user.licenseNo || user.brokerage || user.accountExecutive) && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Profile Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-slate-50 dark:divide-slate-800">
            {user.accountExecutive && (
              <div className="flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 sm:border-b sm:border-slate-50 dark:sm:border-slate-800">
                <UserCheck className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Account Executive
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                    {user.accountExecutive}
                  </p>
                </div>
              </div>
            )}
            {user.state && (
              <div className="flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 sm:border-b sm:border-slate-50 dark:sm:border-slate-800">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    State
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                    {US_STATE_MAP.get(user.state!) || user.state}
                  </p>
                </div>
              </div>
            )}
            {user.targetAreas && (
              <div className="flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 sm:border-b sm:border-slate-50 dark:sm:border-slate-800">
                <Target className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Target Areas
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                    {user.targetAreas}
                  </p>
                </div>
              </div>
            )}
            {user.licenseNo && (
              <div className="flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 sm:border-b sm:border-slate-50 dark:sm:border-slate-800">
                <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    License No
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                    {user.licenseNo}
                  </p>
                </div>
              </div>
            )}
            {user.brokerage && (
              <div className="flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 sm:border-b sm:border-slate-50 dark:sm:border-slate-800">
                <Building2 className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Brokerage
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mt-0.5">
                    {user.brokerage}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Password */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Change Password
          </h3>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={changingPassword || !newPassword}
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs h-10 px-5 w-full sm:w-auto"
            >
              {changingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Min 8 characters with uppercase, lowercase, and a number. The user will be signed out after the change.
          </p>
        </div>
      </div>

      {/* Lead Cost — only for USER role */}
      {user.role === "USER" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Lead Cost</h3>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={leadCostInput}
                  onChange={(e) => setLeadCostInput(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
              <Button
                onClick={saveLeadCost}
                disabled={savingLeadCost}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs h-10 px-5 w-full sm:w-auto"
              >
                {savingLeadCost ? "Saving..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Invoice is automatically sent when this client accepts a lead. Set to $0.00 for manual invoicing.
            </p>
          </div>
        </div>
      )}

      {/* Custom Package — only for USER role */}
      {user.role === "USER" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Custom Package</h3>
            </div>
            {user.customPackage && !showCustomForm && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCustomForm(true)}
                className="text-xs h-7"
              >
                Edit
              </Button>
            )}
          </div>

          {!showCustomForm && !user.customPackage ? (
            <div className="text-center py-10">
              <Sparkles className="h-7 w-7 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-3">No custom package assigned</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCustomForm(true)}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Custom Package
              </Button>
            </div>
          ) : showCustomForm ? (
            <div className="px-4 py-4 sm:px-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Package Name</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Plan for John"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              {/* Price + Type row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="w-full pl-7 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Type</label>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-1">
                    {[
                      { label: "Subscription", value: "SUBSCRIPTION" as const },
                      { label: "Pay Per Lead", value: "PAY_PER_LEAD" as const },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCustomType(opt.value)}
                        className={`flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                          customType === opt.value
                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Duration (days)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Leave empty for no expiry"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Description</label>
                <input
                  type="text"
                  placeholder="Brief description"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Features (one per line)</label>
                <textarea
                  rows={4}
                  placeholder={"10 guaranteed leads\nLive transfers\n24/7 support"}
                  value={customFeatures}
                  onChange={(e) => setCustomFeatures(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {user.customPackage && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={deleteCustomPackage}
                      disabled={deletingCustom}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      {deletingCustom ? "Deleting..." : "Delete"}
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomForm(false);
                      // Reset form if no existing package
                      if (!user.customPackage) {
                        setCustomName("");
                        setCustomPrice("");
                        setCustomType("SUBSCRIPTION");
                        setCustomDuration("");
                        setCustomDescription("");
                        setCustomFeatures("");
                      }
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveCustomPackage}
                    disabled={savingCustom || !customName.trim()}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs"
                  >
                    {savingCustom ? "Saving..." : user.customPackage ? "Update Package" : "Create Package"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Summary view when custom package exists but form is hidden */
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.customPackage!.name}</p>
                <span className="text-sm font-bold text-brand-600">${(user.customPackage!.price / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              {user.customPackage!.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{user.customPackage!.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  user.customPackage!.type === "PAY_PER_LEAD"
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}>
                  {user.customPackage!.type === "PAY_PER_LEAD" ? "Pay Per Lead" : "Subscription"}
                </span>
                {user.customPackage!.durationDays && (
                  <span>{user.customPackage!.durationDays} days</span>
                )}
                {user.customPackage!.features.length > 0 && (
                  <span>{user.customPackage!.features.length} features</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Role change confirmation */}
      <AlertDialog open={!!pendingRole} onOpenChange={() => setPendingRole(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {user.name || user.email}
              </span>
              &apos;s role to{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {pendingRole === "ADMIN"
                  ? "Admin"
                  : pendingRole === "AGENT"
                  ? "QA"
                  : "Client"}
              </span>
              ? This will take effect immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRoleChange}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel subscription confirmation */}
      <AlertDialog open={!!pendingCancel} onOpenChange={() => setPendingCancel(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this subscription for{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {user.name || user.email}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Active</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelSubscription}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Purchase history */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Purchase History
          </h3>
        </div>

        {user.purchases.length === 0 ? (
          <div className="text-center py-14 text-slate-400 dark:text-slate-500">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No purchases yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {user.purchases.map((purchase) => {
              const isExpired =
                purchase.status === "EXPIRED" ||
                (purchase.expiresAt &&
                  new Date(purchase.expiresAt) < new Date());
              const displayStatus = isExpired ? "EXPIRED" : purchase.status;

              return (
                <div
                  key={purchase.id}
                  className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4"
                >
                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg shrink-0 ${
                      displayStatus === "ACTIVE"
                        ? "bg-emerald-50 dark:bg-emerald-900/30"
                        : "bg-slate-50 dark:bg-slate-700"
                    }`}
                  >
                    <CreditCard
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        displayStatus === "ACTIVE"
                          ? "text-emerald-600"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white truncate">
                      {purchase.package.name}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                        <Calendar className="h-3 w-3 hidden sm:block" />
                        {formatShortDateMST(purchase.createdAt)}
                      </span>
                      {purchase.expiresAt && (
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                          <Clock className="h-3 w-3 hidden sm:block" />
                          Exp{" "}
                          {formatShortDateNoYearMST(purchase.expiresAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      ${(purchase.package.price / 100).toLocaleString()}
                    </p>
                    {displayStatus === "ACTIVE" ? (
                      <button
                        onClick={() => setPendingCancel(purchase.id)}
                        disabled={cancelling}
                        className="group/badge inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <span className="group-hover/badge:hidden">ACTIVE</span>
                        <span className="hidden group-hover/badge:inline">CANCEL</span>
                      </button>
                    ) : (
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          displayStatus === "EXPIRED"
                            ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            : displayStatus === "CANCELLED"
                            ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {displayStatus}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
