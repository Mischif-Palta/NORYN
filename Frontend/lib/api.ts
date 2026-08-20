const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed")
  }

  return data
}

export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Login failed")
  }

  return data
}

export async function getDashboard() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/dashboard/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch dashboard")
  }

  return data
}

export async function getTasks() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch tasks")
  }

  return data
}

export async function createTask(
  title: string,
  description: string,
  priority: string,
  dueDate: string | null
) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      priority,
      due_date: dueDate,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create task")
  }

  return data
}

export async function updateTask(
  taskId: string,
  data: {
    title?: string
    description?: string
    status?: string
    priority?: string
    due_date?: string | null
  }
) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.detail || "Failed to update task")
  }

  return responseData
}

export async function deleteTask(taskId: string) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to delete task")
  }

  return data
}

export async function getGoals() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/goals/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch goals")
  }

  return data
}

export async function createGoal(goalData: {
  title: string
  progress: number
  target_date: string | null
}) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/goals/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goalData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to create goal",
    )
  }

  return data
}

export async function updateGoal(
  goalId: string,
  goalData: {
    title?: string
    progress?: number
    target_date?: string | null
  },
) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(
    `${API_URL}/goals/${goalId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update goal",
    )
  }

  return data
}

export async function deleteGoal(goalId: string) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(
    `${API_URL}/goals/${goalId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to delete goal",
    )
  }

  return data
}

export async function getProfile() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch profile")
  }

  return data
}

/* Logout */

export function logoutUser() {
  localStorage.removeItem("access_token")
}