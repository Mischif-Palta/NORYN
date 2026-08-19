"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CalendarDays, Flag, Type } from "lucide-react"
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
import { updateGoal } from "@/lib/api"

export type EditableGoal = {
  id: string
  title: string
  progress: number
  target_date: string | null
}

type EditGoalModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: EditableGoal | null
  onGoalUpdated: () => void
}

export function EditGoalModal({
  open,
  onOpenChange,
  goal,
  onGoalUpdated,
}: EditGoalModalProps) {
  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState("0")
  const [targetDate, setTargetDate] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!goal) return

    setTitle(goal.title)
    setProgress(String(goal.progress))

    if (goal.target_date) {
      setTargetDate(goal.target_date.slice(0, 10))
    } else {
      setTargetDate("")
    }
  }, [goal])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!goal || !title.trim()) return

    const numericProgress = Number(progress)

    if (
      Number.isNaN(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      alert("Progress must be between 0 and 100.")
      return
    }

    setSaving(true)

    try {
      await updateGoal(goal.id, {
        title: title.trim(),
        progress: numericProgress,
        target_date: targetDate
          ? `${targetDate}T23:59:00`
          : null,
      })

      onOpenChange(false)
      onGoalUpdated()
    } catch (error) {
      console.error("Failed to update goal:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update goal",
      )
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-tight">
            Edit Goal
          </DialogTitle>

          <DialogDescription>
            Update your goal and track your progress.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="edit-goal-title">
              Title
            </Label>

            <div className="relative">
              <Type className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="edit-goal-title"
                placeholder="What do you want to achieve?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          {/* Progress */}
          <div className="grid gap-2">
            <Label htmlFor="edit-goal-progress">
              Current Progress (%)
            </Label>

            <div className="relative">
              <Flag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="edit-goal-progress"
                type="number"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Target date */}
          <div className="grid gap-2">
            <Label htmlFor="edit-goal-date">
              Target Date
            </Label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="edit-goal-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
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

            <Button
              type="submit"
              disabled={saving || !title.trim()}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}