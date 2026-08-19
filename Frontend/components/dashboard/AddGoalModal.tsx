"use client"

import type React from "react"
import { useState } from "react"
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
import { createGoal } from "@/lib/api"

type AddGoalModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGoalCreated: () => void
}

export function AddGoalModal({
  open,
  onOpenChange,
  onGoalCreated,
}: AddGoalModalProps) {
  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState("0")
  const [targetDate, setTargetDate] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) return

    setSaving(true)

    try {
      await createGoal({
        title: title.trim(),
        progress: Number(progress),
        target_date: targetDate
          ? `${targetDate}T23:59:00`
          : null,
      })

      setTitle("")
      setProgress("0")
      setTargetDate("")

      onOpenChange(false)
      onGoalCreated()
    } catch (error) {
      console.error("Failed to create goal:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create goal",
      )
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setTitle("")
    setProgress("0")
    setTargetDate("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-tight">
            Add Goal
          </DialogTitle>

          <DialogDescription>
            Create a goal and track your progress over time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="goal-title">Title</Label>

            <div className="relative">
              <Type className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="goal-title"
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
            <Label htmlFor="goal-progress">
              Current Progress (%)
            </Label>

            <div className="relative">
              <Flag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="goal-progress"
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
            <Label htmlFor="goal-date">
              Target Date
            </Label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="goal-date"
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
              {saving ? "Creating..." : "Create Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}