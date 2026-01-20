"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AppointmentsList() {
  const [filterStatus, setFilterStatus] = useState<"all" | "scheduled" | "completed" | "cancelled">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const appointments = [
    {
      id: 1,
      patient: "Rajesh Patel",
      date: "Jan 22, 2026",
      time: "9:30 AM",
      type: "General Checkup",
      status: "scheduled",
    },
    {
      id: 2,
      patient: "Anjali Desai",
      date: "Jan 22, 2026",
      time: "10:45 AM",
      type: "Follow-up",
      status: "scheduled",
    },
    {
      id: 3,
      patient: "Vikram Singh",
      date: "Jan 22, 2026",
      time: "2:00 PM",
      type: "Consultation",
      status: "scheduled",
    },
    {
      id: 4,
      patient: "Priya Nair",
      date: "Jan 21, 2026",
      time: "3:00 PM",
      type: "General Checkup",
      status: "completed",
    },
    {
      id: 5,
      patient: "Arjun Verma",
      date: "Jan 20, 2026",
      time: "11:00 AM",
      type: "Follow-up",
      status: "completed",
    },
  ]

  const filteredAppointments = appointments.filter(
    (apt) =>
      (filterStatus === "all" || apt.status === filterStatus) &&
      (apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
        <p className="text-text-secondary mb-6">Manage and view all your patient appointments.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search patient or appointment type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          {["all", "scheduled", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
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

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((apt) => (
          <Card key={apt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{apt.patient}</h4>
                  <p className="text-sm text-text-secondary mb-2">{apt.type}</p>
                  <p className="text-sm font-medium">
                    {apt.date} at {apt.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[apt.status]}`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                  {apt.status === "scheduled" && <Button size="sm">Start Consultation</Button>}
                  {apt.status === "completed" && (
                    <Button size="sm" variant="outline">
                      View Notes
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
