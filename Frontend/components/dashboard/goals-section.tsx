import { goals } from "@/lib/dashboard-data"
import { GoalCard } from "./GoalCard"

export function GoalsSection() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Goals</h2>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Manage
        </a>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </section>
  )
}
