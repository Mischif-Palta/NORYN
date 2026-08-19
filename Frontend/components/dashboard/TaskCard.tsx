"use client"

import { Check, Trash2 } from "lucide-react"
import type { Priority, Task } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const priorityStyles: Record<Priority, string> = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-chart-3/15 text-chart-3",
  low: "bg-primary/15 text-primary",
}

export function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60">
      {/* Completion checkbox */}
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.done
            ? "Mark task incomplete"
            : "Mark task complete"
        }
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
          task.done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 text-transparent hover:border-primary",
        )}
      >
        <Check className="size-4" />
      </button>

      {/* Task information */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            task.done
              ? "text-muted-foreground line-through"
              : "text-foreground",
          )}
        >
          {task.title}
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {task.category} · {task.time}
        </p>
      </div>

      {/* Priority */}
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
          priorityStyles[task.priority],
        )}
      >
        {task.priority}
      </span>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10"
      >
        <Trash2 className="size-4 text-destructive" />
      </button>
    </div>
  )
}