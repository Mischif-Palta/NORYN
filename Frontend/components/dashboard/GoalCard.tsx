"use client"

import { Flag, Pencil, Trash2 } from "lucide-react"
import type { DashboardGoal } from "./goals-section"

export function GoalCard({
  goal,
  onEdit,
  onDelete,
}: {
  goal: DashboardGoal
  onEdit: (goal: DashboardGoal) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex min-h-[170px] flex-col rounded-xl border border-border/60 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Goal icon */}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <Flag className="size-4" />
        </span>

        {/* Goal title */}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
            {goal.title}
          </p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Goal
          </p>
        </div>

        {/* Vertical actions */}
        <div className="flex shrink-0 flex-col overflow-hidden rounded-lg border border-border/70">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(goal)}
            aria-label="Edit goal"
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="size-4" />
          </button>

          {/* Divider */}
          <div className="h-px bg-border/70" />

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(goal.id)}
            aria-label="Delete goal"
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="size-4 text-destructive" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-auto pt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">
            {goal.progress}%
          </span>

          <span className="text-muted-foreground">
            Due {goal.deadline}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{
              width: `${Math.min(
                Math.max(goal.progress, 0),
                100,
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}