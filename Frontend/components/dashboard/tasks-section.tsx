"use client"

import { useState } from "react"
import { todaysTasks, type Task } from "@/lib/dashboard-data"
import { TaskCard } from "./TaskCard"

export function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>(todaysTasks)

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Today&apos;s Tasks
          </h2>
          <p className="text-xs text-muted-foreground">
            {remaining} remaining of {tasks.length}
          </p>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggle} />
        ))}
      </div>
    </section>
  )
}
