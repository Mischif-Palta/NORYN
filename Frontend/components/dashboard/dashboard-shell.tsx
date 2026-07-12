"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { StatsGrid } from "./stats-grid"
import { TasksSection } from "./tasks-section"
import { GoalsSection } from "./goals-section"
import { AddTaskModal } from "./add-task-modal"
import { cn } from "@/lib/utils"

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Desktop sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full">
            <div className="flex w-64 flex-col border-r border-sidebar-border bg-sidebar backdrop-blur-xl">
              <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="m-3 flex size-9 items-center justify-center self-start rounded-lg bg-secondary text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                Hello Chaitanya{" "}
                <span className="inline-block" aria-hidden="true">
                  👋
                </span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here&apos;s what your day looks like. Stay focused and keep the
                momentum going.
              </p>
            </div>

            <StatsGrid />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <TasksSection />
              </div>
              <div className="lg:col-span-2">
                <GoalsSection />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Add Task button */}
      <button
        type="button"
        onClick={() => setAddTaskOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="size-5" />
        <span className="hidden sm:inline">Add Task</span>
      </button>

      <AddTaskModal open={addTaskOpen} onOpenChange={setAddTaskOpen} />
    </div>
  )
}
