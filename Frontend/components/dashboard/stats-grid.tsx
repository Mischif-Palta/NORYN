"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Clock, Target, CalendarDays } from "lucide-react"

import { getDashboard } from "@/lib/api"
import { StatsCard } from "./StatsCard"
import type { StatCard } from "@/lib/dashboard-data"

export function StatsGrid() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      id: "pending",
      label: "Pending Tasks",
      value: 0,
      hint: "From your tasks",
      icon: Clock,
    },
    {
      id: "completed",
      label: "Completed Tasks",
      value: 0,
      hint: "Completed tasks",
      icon: CheckCircle2,
    },
    {
      id: "goals",
      label: "Active Goals",
      value: 0,
      hint: "Your goals",
      icon: Target,
    },
    {
      id: "today",
      label: "Today's Tasks",
      value: 0,
      hint: "Not available yet",
      icon: CalendarDays,
    },
  ])

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard()

        setStats([
          {
            id: "pending",
            label: "Pending Tasks",
            value: data.pending_tasks,
            hint: "From your tasks",
            icon: Clock,
          },
          {
            id: "completed",
            label: "Completed Tasks",
            value: data.completed_tasks,
            hint: "Completed tasks",
            icon: CheckCircle2,
          },
          {
            id: "goals",
            label: "Active Goals",
            value: data.total_goals,
            hint: `Average progress: ${data.average_goal_progress}%`,
            icon: Target,
          },
          {
            id: "today",
            label: "Today's Tasks",
            value: 0,
            hint: "Not available yet",
            icon: CalendarDays,
          },
        ])
      } catch (error) {
        console.error("Failed to load dashboard:", error)
      }
    }

    loadDashboard()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.id} stat={stat} />
      ))}
    </div>
  )
}