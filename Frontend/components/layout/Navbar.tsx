"use client"

import { useState } from "react"

import {
  Search,
  Bell,
  Menu,
  LogOut,
} from "lucide-react"

import { useRouter } from "next/navigation"

import { logoutUser } from "@/lib/api"

export function Navbar({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  const router = useRouter()
  const [profileOpen, setProfileOpen] = useState(false)

  function handleLogout() {
    logoutUser()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-8">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="size-5" />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          placeholder="Search tasks, goals..."
          className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring/60 focus:bg-secondary"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setProfileOpen((open) => !open)
            }
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-secondary"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              C
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-foreground">
                Chaitanya
              </span>
            </span>
          </button>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}