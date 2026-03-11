export default function PortalPageSkeleton({ statCards = 4, rows = 6 }: { statCards?: number; rows?: number }) {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      {statCards > 0 && (
        <div className={`grid grid-cols-2 sm:grid-cols-${statCards > 4 ? 3 : statCards} gap-2 sm:gap-4 mb-4 sm:mb-6`}>
          {Array.from({ length: statCards }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 sm:p-4"
            >
              <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-10 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="hidden sm:flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          ))}
        </div>
      </div>

      {/* Table/card skeleton */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3.5 border-b border-slate-100 dark:border-slate-700 last:border-0"
          >
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-48 rounded bg-slate-100 dark:bg-slate-700/50" />
            </div>
            <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
