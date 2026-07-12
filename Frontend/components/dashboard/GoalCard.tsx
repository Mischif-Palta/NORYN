import { Flag } from "lucide-react"
import type { Goal } from "@/lib/dashboard-data"

export function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <Flag className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {goal.title}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {goal.description}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">{goal.progress}%</span>
          <span className="text-muted-foreground">Due {goal.deadline}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
