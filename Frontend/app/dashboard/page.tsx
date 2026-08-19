"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function Page() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      router.replace("/login")
      return
    }

    setCheckingAuth(false)
  }, [router])

  if (checkingAuth) {
    return null
  }

  return <DashboardShell />
}