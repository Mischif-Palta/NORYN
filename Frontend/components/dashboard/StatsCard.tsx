import type { StatCard } from "@/lib/dashboard-data"

export function StatsCard({ stat }: { stat: StatCard }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition-colors hover:border-ring/40">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </span>
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
          <stat.icon className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        {stat.value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
    </div>
  )
}
