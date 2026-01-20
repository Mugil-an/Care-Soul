"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function PatientSummary() {
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    {
      id: 1,
      name: "Rajesh Patel",
      age: 45,
      lastVisit: "Jan 15, 2026",
      condition: "Hypertension",
      visits: 8,
    },
    {
      id: 2,
      name: "Anjali Desai",
      age: 38,
      lastVisit: "Jan 10, 2026",
      condition: "Diabetes Management",
      visits: 12,
    },
    {
      id: 3,
      name: "Vikram Singh",
      age: 52,
      lastVisit: "Jan 8, 2026",
      condition: "Cardiac Follow-up",
      visits: 15,
    },
    {
      id: 4,
      name: "Priya Nair",
      age: 32,
      lastVisit: "Jan 5, 2026",
      condition: "General Health",
      visits: 3,
    },
    {
      id: 5,
      name: "Arjun Verma",
      age: 55,
      lastVisit: "Dec 28, 2025",
      condition: "Respiratory Issues",
      visits: 10,
    },
  ]

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">My Patients</h2>
        <p className="text-text-secondary mb-6">View and manage all your registered patients.</p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by patient name or condition..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <p className="text-sm text-text-secondary mt-1">{patient.age} years old</p>
                </div>
                <div className="text-2xl">👤</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary font-medium">Condition</p>
                <p className="text-sm font-semibold">{patient.condition}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div>
                  <p className="text-xs text-text-secondary font-medium">Last Visit</p>
                  <p className="text-sm font-semibold">{patient.lastVisit}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">Total Visits</p>
                  <p className="text-sm font-semibold">{patient.visits}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-3">
                <Button size="sm" className="flex-1">
                  View Records
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
