"use client"

import { useEffect, useState } from "react"
import {
  deleteTask,
  getTasks,
  updateTask,
} from "@/lib/api"
import { type Task } from "@/lib/dashboard-data"
import { TaskCard } from "./TaskCard"

export function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Load tasks from backend
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()

        const formattedTasks: Task[] = data.map((task: any) => ({
          id: String(task.id),
          title: task.title,
          category: "Task",
          time: task.due_date
            ? new Date(task.due_date).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
            : "No due date",
          priority: task.priority.toLowerCase(),
          done: task.status === "Completed",
        }))

        setTasks(formattedTasks)
      } catch (error) {
        console.error("Failed to load tasks:", error)
      }
    }

    loadTasks()
  }, [])

  // Toggle task completion
  const toggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id)

    if (!task) return

    const previousDone = task.done
    const newDone = !previousDone
    const newStatus = newDone ? "Completed" : "Pending"

    // Update UI immediately
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: newDone }
          : t,
      ),
    )

    try {
      // Update backend
      await updateTask(id, {
        status: newStatus,
      })
    } catch (error) {
      // Backend failed → restore previous UI state
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, done: previousDone }
            : t,
        ),
      )

      console.error("Failed to update task:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update task",
      )
    }
  }

  // Delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)

      // Remove from UI immediately after successful deletion
      setTasks((prev) =>
        prev.filter((task) => task.id !== id),
      )
    } catch (error) {
      console.error("Failed to delete task:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete task",
      )
    }
  }

  const remaining = tasks.filter(
    (task) => !task.done,
  ).length

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20 backdrop-blur-xl">
      {/* Header */}
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

      {/* Tasks */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}