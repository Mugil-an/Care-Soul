"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HealthRecords() {
  const [filterType, setFilterType] = useState<"all" | "prescriptions" | "reports" | "documents">("all")

  const records = [
    {
      id: 1,
      title: "Blood Test Report",
      type: "reports",
      date: "Dec 15, 2025",
      doctor: "Dr. Priya Sharma",
      status: "Normal",
    },
    {
      id: 2,
      title: "Blood Pressure Medication",
      type: "prescriptions",
      date: "Dec 15, 2025",
      doctor: "Dr. Priya Sharma",
      status: "Active",
    },
    {
      id: 3,
      title: "Cardiac Check-up Report",
      type: "reports",
      date: "Nov 28, 2025",
      doctor: "Dr. Rajesh Kumar",
      status: "Normal",
    },
    {
      id: 4,
      title: "Appointment Summary",
      type: "documents",
      date: "Nov 28, 2025",
      doctor: "Dr. Rajesh Kumar",
      status: "Complete",
    },
    {
      id: 5,
      title: "Vitamin D Supplement",
      type: "prescriptions",
      date: "Oct 10, 2025",
      doctor: "Dr. Priya Sharma",
      status: "Completed",
    },
    {
      id: 6,
      title: "X-Ray Imaging Report",
      type: "reports",
      date: "Sep 20, 2025",
      doctor: "Dr. Amit Patel",
      status: "Normal",
    },
  ]

  const filteredRecords = filterType === "all" ? records : records.filter((r) => r.type === filterType)

  const typeIcons: Record<string, string> = {
    prescriptions: "💊",
    reports: "📊",
    documents: "📄",
  }

  const statusColors: Record<string, string> = {
    Normal: "bg-green-100 text-green-700",
    Active: "bg-blue-100 text-blue-700",
    Complete: "bg-green-100 text-green-700",
    Completed: "bg-gray-100 text-gray-700",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Health Records</h2>
        <p className="text-text-secondary mb-6">Access all your medical reports, prescriptions, and documents.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", "prescriptions", "reports", "documents"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as typeof filterType)}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
              filterType === type ? "bg-primary text-white" : "bg-surface-secondary text-foreground hover:bg-border"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-3xl mt-1">{typeIcons[record.type]}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{record.title}</h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {record.doctor} • {record.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[record.status]}`}>
                    {record.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Section */}
      <Card className="bg-primary/5 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="font-semibold mb-2">Upload Your Records</h3>
            <p className="text-sm text-text-secondary mb-4">Share additional medical documents with your doctors</p>
            <Button>Upload Document</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
