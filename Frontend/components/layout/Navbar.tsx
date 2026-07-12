"use client"

import { Search, Bell, Menu } from "lucide-react"

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tasks, goals..."
          className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring/60 focus:bg-secondary"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" />
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-secondary"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            C
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-foreground">
              Chaitanya
            </span>
            <span className="block text-xs leading-tight text-muted-foreground">
              Pro plan
            </span>
          </span>
        </button>
      </div>
    </header>
  )
}
