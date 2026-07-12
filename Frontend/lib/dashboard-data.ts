import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Clock,
  Target,
  CalendarDays,
} from "lucide-react"

export type StatCard = {
  id: string
  label: string
  value: number
  hint: string
  icon: LucideIcon
}

export const stats: StatCard[] = [
  {
    id: "pending",
    label: "Pending Tasks",
    value: 12,
    hint: "4 due this week",
    icon: Clock,
  },
  {
    id: "completed",
    label: "Completed Tasks",
    value: 48,
    hint: "+8 from last week",
    icon: CheckCircle2,
  },
  {
    id: "goals",
    label: "Active Goals",
    value: 6,
    hint: "2 nearly done",
    icon: Target,
  },
  {
    id: "today",
    label: "Today's Tasks",
    value: 5,
    hint: "2 high priority",
    icon: CalendarDays,
  },
]

export type Priority = "high" | "medium" | "low"

export type Task = {
  id: string
  title: string
  category: string
  time: string
  priority: Priority
  done: boolean
}

export const todaysTasks: Task[] = [
  {
    id: "t1",
    title: "Finish LifeOS dashboard wireframes",
    category: "Design",
    time: "9:00 AM",
    priority: "high",
    done: false,
  },
  {
    id: "t2",
    title: "Review pull requests from the team",
    category: "Engineering",
    time: "11:30 AM",
    priority: "medium",
    done: false,
  },
  {
    id: "t3",
    title: "Morning workout & stretch routine",
    category: "Health",
    time: "7:00 AM",
    priority: "low",
    done: true,
  },
  {
    id: "t4",
    title: "Draft Q3 product roadmap",
    category: "Planning",
    time: "2:00 PM",
    priority: "high",
    done: false,
  },
  {
    id: "t5",
    title: "Call with marketing on launch copy",
    category: "Marketing",
    time: "4:15 PM",
    priority: "medium",
    done: false,
  },
]

export type Goal = {
  id: string
  title: string
  description: string
  progress: number
  deadline: string
}

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Ship LifeOS v1.0",
    description: "Launch the first public version of the dashboard.",
    progress: 72,
    deadline: "Aug 30",
  },
  {
    id: "g2",
    title: "Read 12 books this year",
    description: "Currently on book number eight of the year.",
    progress: 66,
    deadline: "Dec 31",
  },
  {
    id: "g3",
    title: "Run a half marathon",
    description: "Following a 10-week progressive training plan.",
    progress: 40,
    deadline: "Oct 12",
  },
  {
    id: "g4",
    title: "Learn Spanish basics",
    description: "Daily lessons to reach conversational level.",
    progress: 28,
    deadline: "Nov 01",
  },
]
