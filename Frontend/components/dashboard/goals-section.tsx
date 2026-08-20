"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { deleteGoal, getGoals } from "@/lib/api"
import { GoalCard } from "./GoalCard"
import { AddGoalModal } from "./AddGoalModal"
import {
  EditGoalModal,
  type EditableGoal,
} from "./EditGoalModal"

export type DashboardGoal = {
  id: string
  title: string
  description: string
  progress: number
  deadline: string
  target_date: string | null
}

export function GoalsSection() {
  const [goals, setGoals] = useState<DashboardGoal[]>([])

  const [addGoalOpen, setAddGoalOpen] =
    useState(false)

  const [editGoalOpen, setEditGoalOpen] =
    useState(false)

  const [selectedGoal, setSelectedGoal] =
    useState<EditableGoal | null>(null)

  // Load goals from backend
  async function loadGoals() {
    try {
      const data = await getGoals()

      const formattedGoals: DashboardGoal[] = data.map(
        (goal: any) => ({
          id: String(goal.id),
          title: goal.title,
          description: "NORYN Goal",
          progress: goal.progress,

          deadline: goal.target_date
            ? new Date(
                goal.target_date,
              ).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })
            : "No deadline",

          target_date: goal.target_date,
        }),
      )

      setGoals(formattedGoals)
    } catch (error) {
      console.error(
        "Failed to load goals:",
        error,
      )
    }
  }

  // Load goals when dashboard mounts
  useEffect(() => {
    loadGoals()
  }, [])

  // Open edit modal
  function handleEdit(goal: DashboardGoal) {
    setSelectedGoal({
      id: goal.id,
      title: goal.title,
      progress: goal.progress,
      target_date: goal.target_date,
    })

    setEditGoalOpen(true)
  }

  // Delete goal
  async function handleDelete(goalId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?",
    )

    if (!confirmed) return

    try {
      await deleteGoal(goalId)

      // Remove from UI immediately
      setGoals((prev) =>
        prev.filter(
          (goal) => goal.id !== goalId,
        ),
      )
    } catch (error) {
      console.error(
        "Failed to delete goal:",
        error,
      )

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete goal",
      )
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Goals
          </h2>

          <p className="text-xs text-muted-foreground">
            {goals.length} active
          </p>
        </div>

        {/* Add Goal */}
        <button
          type="button"
          onClick={() =>
            setAddGoalOpen(true)
          }
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="size-4" />
          Add Goal
        </button>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal
        open={addGoalOpen}
        onOpenChange={setAddGoalOpen}
        onGoalCreated={loadGoals}
      />

      {/* Edit Goal Modal */}
      <EditGoalModal
        open={editGoalOpen}
        onOpenChange={setEditGoalOpen}
        goal={selectedGoal}
        onGoalUpdated={loadGoals}
      />
    </section>
  )
}