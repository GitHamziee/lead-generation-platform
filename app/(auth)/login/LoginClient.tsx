"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";

export default function LoginClient() {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    loading,
    error,
    registered,
    registerHref,
    handleSubmit,
  } = useLogin();

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
      <div className="relative w-full max-w-[420px]">
        {/* Gradient glow behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand-500/20 via-accent-500/10 to-brand-600/20 blur-xl" />

        <div className="glass-card relative rounded-2xl px-8 py-9">
          <div className="mb-7 text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
              <Sparkles className="h-3 w-3" />
              Welcome back
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign in to <span className="gradient-text">R4Referral</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter your credentials to access your portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {registered === "1" && (
              <p className="text-sm text-green-600 text-center">Account created, please sign in.</p>
            )}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
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
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In <ArrowRight className="h-4 w-4" />
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
              Don&apos;t have an account?{" "}
              <Link href={registerHref} className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                Create one
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
