"use client"

import { registerUser } from "@/lib/api"

import type React from "react"
import { useState } from "react"

import {
  User,
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

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const data = await registerUser(
        name,
        email,
        password,
      )

      console.log(
        "Registration successful:",
        data,
      )

      window.location.href = "/login"
    } catch (error) {
      console.error(
        "Registration failed:",
        error,
      )

      alert(
        error instanceof Error
          ? error.message
          : "Registration failed",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card shadow-2xl backdrop-blur-xl">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white">
            <img
              src="/noryn/noryn-mark-light.svg"
              alt="NORYN"
              className="size-11"
            />
          </div>

          <span className="text-2xl font-semibold tracking-tight">
            NORYN
          </span>

          <p className="text-xs font-medium text-muted-foreground">
            Plan less. Adapt better.
          </p>
        </div>

        <CardTitle className="text-xl">
          Create your account
        </CardTitle>

        <CardDescription>
          Start organizing your life with NORYN
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Name
            </Label>

            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="pl-9"
              />
            </div>
          </div>

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
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type="password"
                autoComplete="new-password"
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

          {/* Register button */}
          <Button
            type="submit"
            className="mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"Already have an account? "}

          <a
            href="/login"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Login
          </a>
        </p>
      </CardContent>
    </Card>
  )
}