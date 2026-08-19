"use client"

import { createTask } from "@/lib/api"

import type React from "react"
import { useState } from "react"
import { CalendarDays, Clock, FileText, Flag, Type } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Priority } from "@/lib/dashboard-data"

type AddTaskModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TaskDraft = {
  title: string
  description: string
  priority: Priority
  deadline: string
  estimatedMinutes: string
}

const initialDraft: TaskDraft = {
  title: "",
  description: "",
  priority: "medium",
  deadline: "",
  estimatedMinutes: "",
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [draft, setDraft] = useState<TaskDraft>(initialDraft)
  const [saving, setSaving] = useState(false)

  function update<K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setSaving(true)

  try {
    const data = await createTask(
      draft.title,
      draft.description,
      draft.priority,
      draft.deadline ? `${draft.deadline}T23:59:00` : null
    )

    console.log("Task created successfully:", data)

    setDraft(initialDraft)
    onOpenChange(false)

    window.location.reload()
  } catch (error) {
    console.error("Failed to create task:", error)
    alert(error instanceof Error ? error.message : "Failed to create task")
  } finally {
    setSaving(false)
  }
}

  function handleCancel() {
    setDraft(initialDraft)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-tight">Add Task</DialogTitle>
          <DialogDescription>
            Create a new task and keep your momentum going.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Title</Label>
            <div className="relative">
              <Type className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="task-title"
                placeholder="What needs to get done?"
                value={draft.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-description">Description</Label>
            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Textarea
                id="task-description"
                placeholder="Add a few details..."
                value={draft.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="resize-none pl-9"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={draft.priority}
                onValueChange={(v) => update("priority", v as Priority)}
              >
                <SelectTrigger id="task-priority" className="w-full">
                  <div className="flex items-center gap-2">
                    <Flag className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Select priority" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-minutes">Estimated Minutes</Label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="task-minutes"
                  type="number"
                  min={0}
                  step={5}
                  placeholder="30"
                  value={draft.estimatedMinutes}
                  onChange={(e) => update("estimatedMinutes", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-deadline">Deadline</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="task-deadline"
                type="date"
                value={draft.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving || !draft.title.trim()}>
              {saving ? "Saving..." : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
