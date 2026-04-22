"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, ArrowLeft, ChevronDown, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { US_STATES, US_STATE_MAP } from "@/lib/constants";

const inputClass =
  "w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

export default function RegisterClient() {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    loading,
    error,
    passwordError,
    setPasswordError,
    loginHref,
    handleSubmit,
    stateOpen,
    setStateOpen,
    stateRef,
  } = useRegister();

  const [stateSearch, setStateSearch] = useState("");

  const filteredStates = stateSearch
    ? US_STATES.filter((s) => s.label.toLowerCase().includes(stateSearch.toLowerCase()))
    : US_STATES;

  const selectedStateLabel = US_STATE_MAP.get(formData.state);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16">
      {/* Decorative background */}
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute top-1/4 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-[24rem] w-[24rem] rounded-full bg-accent-100/40 dark:bg-accent-900/25 blur-3xl" />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-5 left-5 z-10 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      {/* Logo */}
      <Link href="/" className="relative mb-6">
        <Image src="/logo.png" alt="R4Referral" width={44} height={44} className="h-[44px] w-[44px] object-contain dark:brightness-0 dark:invert" />
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-[520px]">
        {/* Gradient glow behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand-500/20 via-accent-500/10 to-brand-600/20 blur-xl" />

        <div className="glass-card relative rounded-2xl px-8 py-9">
          <div className="mb-7 text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
              <Sparkles className="h-3 w-3" />
              Get started
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create your <span className="gradient-text">R4Referral</span> account
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Get access to your campaign portal in minutes.
            </p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Row 1: Full Name */}
          <div>
            <label className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              className={inputClass}
            />
          </div>

          {/* Row 2: Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3: Password + Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    setPasswordError("");
                  }}
                  placeholder="Repeat password"
                  className={`w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    passwordError
                      ? "border-red-300 bg-red-50/30 dark:bg-red-950/30 focus:border-red-400 focus:ring-red-400/15"
                      : "border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-brand-500/15"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs text-red-500">{passwordError}</p>
              )}
            </div>
          </div>

          {/* Row 4: License No + Brokerage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                License No <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.licenseNo}
                onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                placeholder="e.g. SL12345678"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Brokerage <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.brokerage}
                onChange={(e) => setFormData({ ...formData, brokerage: e.target.value })}
                placeholder="e.g. Keller Williams"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 5: Target Areas */}
          <div>
            <label className={labelClass}>
              Target Areas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.targetAreas}
              onChange={(e) => setFormData({ ...formData, targetAreas: e.target.value })}
              placeholder="Miami, Fort Lauderdale, Palm Beach"
              className={inputClass}
            />
          </div>

          {/* Row 6: State + Account Executive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative" ref={stateRef}>
                <button
                  type="button"
                  onClick={() => { setStateOpen((o) => !o); setStateSearch(""); }}
                  className={`flex items-center justify-between w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 text-sm transition-all focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 ${
                    formData.state ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {selectedStateLabel || "Select state..."}
                  <ChevronDown className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform ${stateOpen ? "rotate-180" : ""}`} />
                </button>
                {stateOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-30 overflow-hidden">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          value={stateSearch}
                          onChange={(e) => setStateSearch(e.target.value)}
                          placeholder="Search states..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 rounded-lg focus:outline-none focus:border-brand-500"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto py-1">
                      {filteredStates.length === 0 ? (
                        <p className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500">No states found</p>
                      ) : (
                        filteredStates.map((opt) => (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => { setFormData({ ...formData, state: opt.value }); setStateOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                              formData.state === opt.value ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            {opt.label}
                            {formData.state === opt.value && <span className="float-right text-brand-600">&#10003;</span>}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={labelClass}>
                Account Executive <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.accountExecutive}
                onChange={(e) => setFormData({ ...formData, accountExecutive: e.target.value })}
                placeholder="Name of your AE"
                className={inputClass}
              />
            </div>
          </div>

          <div className="pt-1">
            <div className="btn-gradient-wrap w-full rounded-md">
              <Button
                type="submit"
                disabled={loading}
                className="btn-gradient w-full text-white border-0 text-sm font-semibold h-11 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-1">
            <Link href="/privacy-policy" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            {" | "}
            <Link href="/terms-of-service" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
          </p>
        </form>

          <div className="mt-7 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link href={loginHref} className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative mt-8 text-xs text-slate-400 dark:text-slate-500">
        © {new Date().getFullYear()} R4Referral LLC ·{" "}
        <Link href="/privacy-policy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy</Link>
        {" "}·{" "}
        <Link href="/terms-of-service" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</Link>
      </p>
    </div>
  );
}
