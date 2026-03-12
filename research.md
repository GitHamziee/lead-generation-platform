# Codebase Audit — Research Notes

## Files Audited
- 26 API routes (all admin, auth, stripe, leads, invoices, packages)
- 15 React hooks (all hooks/* files)
- 40+ frontend components and pages
- Prisma schema + 10 lib files
- Middleware, next.config, package.json

---

## CRITICAL FINDINGS

### 1. Admin Stats — Unbounded Revenue Query
- **File**: `app/api/admin/stats/route.ts:54-56`
- Fetches ALL purchases with `findMany()` to sum prices in JS
- At 100K+ purchases, fetches megabytes of data; endpoint becomes unusable
- Fix: Use `groupBy` + price map (same pattern already used in analytics route)

### 2. Lead Accept + Auto-Invoice Not Atomic
- **File**: `app/api/my-leads/route.ts:127-166`
- `acceptLead()` succeeds → auto-invoice fails → lead stuck in ACCEPTED with no invoice
- Revenue leak: user accepts lead but never gets invoiced
- Fix: Wrap in `$transaction`

### 3. Lazy Expiry Race Condition
- **File**: `lib/purchase-utils.ts:28-34`
- Two concurrent requests can both check same expired purchase, both update
- Fix: Filter expired directly in WHERE clause instead of post-fetch check

### 4. Polling Race Conditions in Hooks
- **Files**: `hooks/useMyLeads.ts:90-106`, `hooks/useAdminLeads.ts:118-134`
- 30s poll + manual fetch can overlap → stale response overwrites fresh data
- Fix: AbortController or request-ID pattern

### 5. Framer Motion Bundle Impact
- ~40KB+ gzipped, imported in 6+ components
- Every portal page that imports animation components gets it
- Fix: Dynamic imports for below-fold animations

---

## HIGH SEVERITY

### 6. Missing Compound Indexes on Lead Table
- Queries filter on `(assignedToId, status)` but only single indexes exist
- At 10K+ leads, compound index would dramatically speed pagination
- Add: `@@index([assignedToId, status])`, `@@index([agentId, createdAt])`

### 7. next.config.ts Has Zero Optimizations
- Empty config — no image optimization, no package import optimization
- Missing `experimental.optimizePackageImports: ["lucide-react"]`
- Missing `compress: true`, `reactStrictMode: true`

### 8. Large Modals Always SSR'd
- My-leads and lead-history pages render 240+ lines of modal JSX even when closed
- Fix: Dynamic import modals with `ssr: false`

### 9. Homepage Animations Not Lazy Loaded
- 7 client-heavy components loaded eagerly; only hero visible on first paint
- Fix: `dynamic()` import for below-fold sections (StatsBar, Testimonials, etc.)

### 10. Admin Leads Uses `include` Instead of `select`
- `app/api/admin/leads/route.ts:42-47` — fetches more data than needed
- Fix: Switch to explicit `select` pattern (already done in my-leads)

### 11. StripeLog + PasswordResetToken Unbounded Growth
- No cleanup/TTL strategy; tables grow forever
- Fix: Periodic cleanup in admin stats endpoint

### 12. Pool Connection Not Configured
- `lib/prisma.ts:13-19` — default pool settings, no max/min/timeout
- Fix: Add explicit `max: 20, idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000`

---

## MEDIUM SEVERITY

### 13. Debounce Timers Not Cleaned on Unmount (4 hooks)
- `useAdminLeads`, `useAdminSubscriptions`, `useAdminUsers`, `useLeadHistory`
- setState called on unmounted component after debounce fires
- Fix: `clearTimeout(debounceRef.current)` in cleanup

### 14. Auth Layout Unnecessary `use client`
- `app/(auth)/layout.tsx` — uses `useSession()` to redirect; middleware already handles this
- Delays rendering of all auth pages
- Fix: Remove `useSession()`, let middleware handle redirects

### 15. Packages Route Not Authenticated for Custom Packages
- `app/api/packages/route.ts:24-37` — custom package exposed if `userId` param guessed
- Fix: Require auth when `userId` param provided

### 16. Email Enumeration via Timing in Forgot Password
- `app/api/auth/forgot-password/route.ts:33-40`
- DB lookup timing leaks whether email exists
- Fix: Add constant-time padding (~100ms)

### 17. Invoice Status Missing Refund/Dispute States
- Only PENDING | PAID; no way to track chargebacks
- Consider adding REFUNDED, DISPUTED

### 18. Admin Analytics Timezone Confusion
- UTC boundaries used but not documented; admin in PST sees data shifted
- Document: "All analytics use UTC timezone"

---

## LOW SEVERITY

### 19. ThemeToggle Hydration Mismatch
- Renders placeholder on server, real component on client → layout shift
- Fix: `dynamic(() => ..., { ssr: false })`

### 20. Name Regex Overly Restrictive
- `/^[a-zA-Z\s'-]+$/` rejects accented names (José, François)
- Fix: `/^[\p{L}\s'-]+$/u` (Unicode-aware)

### 21. Email Regex Too Permissive
- Accepts `a@b.c` — technically valid but unusual
- Minor concern, won't fix unless required

### 22. Inline Objects/Functions in JSX
- Status filter arrays recreated every render in multiple pages
- Minor perf impact; extract as module-level constants

---

## SECURITY AUDIT

### Auth & Middleware ✓
- JWT strategy with 5-min revalidation — solid
- tokenVersion incremented on password/role change — good
- Middleware covers all protected routes — good
- bcrypt with salt rounds 12 — good
- Rate limiting on all sensitive endpoints — good

### Input Validation ✓
- Register: validates name, email, password, phone, state
- All API inputs sanitized with `sanitizeInput()`
- SQL injection: Not applicable (Prisma ORM parameterizes all queries)

### Stripe ✓
- Webhook signature verification — good
- Idempotency keys on checkout — good
- P2002 catch for race conditions — good
- Comprehensive logging via StripeLog — good

### Gaps
- Custom package info leaks without auth (packages route)
- Email timing attack on forgot-password
- No CSRF protection (mitigated by SameSite cookies in NextAuth)
- No Content-Security-Policy headers

---

## WHAT'S ALREADY WELL DONE
- Explicit `select` on my-leads route (recently optimized)
- `skipStats` for silent polling (recently added)
- Search debounce on admin hooks (recently added)
- Loading skeletons for all routes (recently added)
- Batch filter + page reset pattern (recently fixed)
- GroupBy for subscription stats (recently optimized)
- Aggregate for analytics (recently optimized)
- Database indexes on Purchase (recently added)
- Rate limiting on most endpoints
- Stripe error handling with typed Stripe errors
- Transaction usage in invoice creation and payment marking
