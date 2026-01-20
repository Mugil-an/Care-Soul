"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all")

  const users = [
    {
      id: 1,
      name: "Rajesh Patel",
      email: "rajesh@example.com",
      joinDate: "Jan 15, 2026",
      appointments: 5,
      status: "active",
    },
    {
      id: 2,
      name: "Anjali Desai",
      email: "anjali@example.com",
      joinDate: "Jan 12, 2026",
      appointments: 12,
      status: "active",
    },
    {
      id: 3,
      name: "Vikram Singh",
      email: "vikram@example.com",
      joinDate: "Jan 8, 2026",
      appointments: 3,
      status: "active",
    },
    {
      id: 4,
      name: "Priya Nair",
      email: "priya@example.com",
      joinDate: "Dec 20, 2025",
      appointments: 0,
      status: "inactive",
    },
    {
      id: 5,
      name: "Arjun Verma",
      email: "arjun@example.com",
      joinDate: "Dec 10, 2025",
      appointments: 8,
      status: "suspended",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      (filterStatus === "all" || user.status === filterStatus) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    suspended: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <p className="text-text-secondary mb-6">Manage and monitor all registered users on the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          {["all", "active", "inactive", "suspended"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-foreground hover:bg-border"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-text-secondary">{user.email}</p>
                    <p className="text-xs text-text-secondary mt-1">Joined {user.joinDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.appointments}</p>
                    <p className="text-xs text-text-secondary">Appointments</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                    <Button size="sm" variant="outline">
                      Actions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
