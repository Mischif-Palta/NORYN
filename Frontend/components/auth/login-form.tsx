"use client"

import { loginUser } from "@/lib/api"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Mail,
  Lock,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const data = await loginUser(
        email,
        password,
      )

      console.log("Login successful:", data)

      localStorage.setItem(
        "access_token",
        data.access_token,
      )

      // Go directly to the protected dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Login failed",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card shadow-2xl backdrop-blur-xl">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" />
          </div>

          <span className="text-2xl font-semibold tracking-tight">
            LifeOS
          </span>
        </div>

        <CardTitle className="text-xl">
          Welcome back
        </CardTitle>

        <CardDescription>
          Sign in to continue to your dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">
              Email
            </Label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="pl-9"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">
                Password
              </Label>

              <button
                type="button"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() =>
                  alert(
                    "Password recovery will be added later.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="pl-9"
              />
            </div>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}

          <a
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Register
          </a>
        </p>
      </CardContent>
    </Card>
  )
}