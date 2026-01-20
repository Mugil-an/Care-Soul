"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function DoctorManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVerification, setFilterVerification] = useState<"all" | "verified" | "pending" | "rejected">("all")

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      email: "priya@careSoul.com",
      license: "LIC-2024-001",
      verification: "verified",
      joinDate: "Dec 1, 2025",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      email: "rajesh@careSoul.com",
      license: "LIC-2024-002",
      verification: "verified",
      joinDate: "Dec 5, 2025",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialty: "Orthopedic Surgeon",
      email: "amit@careSoul.com",
      license: "LIC-2024-003",
      verification: "pending",
      joinDate: "Jan 18, 2026",
    },
    {
      id: 4,
      name: "Dr. Meera Desai",
      specialty: "Pediatrician",
      email: "meera@careSoul.com",
      license: "LIC-2024-004",
      verification: "pending",
      joinDate: "Jan 19, 2026",
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      specialty: "Pulmonologist",
      email: "vikram@careSoul.com",
      license: "LIC-2024-005",
      verification: "rejected",
      joinDate: "Jan 10, 2026",
    },
  ]

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (filterVerification === "all" || doctor.verification === filterVerification) &&
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const verificationColors: Record<string, string> = {
    verified: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Doctor Management</h2>
        <p className="text-text-secondary mb-6">Manage doctor profiles and verify medical credentials.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, specialty, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          {["all", "verified", "pending", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterVerification(status as typeof filterVerification)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
                filterVerification === status
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-foreground hover:bg-border"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Table */}
      <div className="space-y-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{doctor.name}</h4>
                  <p className="text-sm text-text-secondary">{doctor.specialty}</p>
                  <p className="text-xs text-text-secondary mt-1">{doctor.email}</p>
                  <p className="text-xs text-text-secondary">License: {doctor.license}</p>
                  <p className="text-xs text-text-secondary">Joined: {doctor.joinDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                      verificationColors[doctor.verification]
                    }`}
                  >
                    {doctor.verification.charAt(0).toUpperCase() + doctor.verification.slice(1)}
                  </span>
                  {doctor.verification === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Deny
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Profile
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
