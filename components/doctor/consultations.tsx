"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Consultations() {
  const activeConsultations = [
    {
      id: 1,
      patient: "Vikram Singh",
      startTime: "2:00 PM",
      duration: "15 min",
      status: "active",
    },
    {
      id: 2,
      patient: "Ravi Kumar",
      startTime: "2:30 PM (scheduled)",
      duration: "30 min",
      status: "scheduled",
    },
  ]

  const pastConsultations = [
    {
      id: 1,
      patient: "Priya Nair",
      date: "Jan 21, 2026",
      duration: "25 min",
    },
    {
      id: 2,
      patient: "Arjun Verma",
      date: "Jan 20, 2026",
      duration: "20 min",
    },
    {
      id: 3,
      patient: "Anjali Desai",
      date: "Jan 19, 2026",
      duration: "30 min",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Consultations</h2>
        <p className="text-text-secondary mb-6">Manage your video consultations and telemedicine sessions.</p>
      </div>

      {/* Active Consultations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Active & Upcoming</h3>
        <div className="space-y-4">
          {activeConsultations.map((consult) => (
            <Card
              key={consult.id}
              className={`${
                consult.status === "active" ? "border-green-300 bg-green-50" : "border-border"
              } hover:shadow-md transition-shadow`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{consult.patient}</h4>
                      {consult.status === "active" && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Live</span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      {consult.startTime} • {consult.duration}
                    </p>
                  </div>
                  {consult.status === "active" ? (
                    <Button className="bg-green-600 hover:bg-green-700">Continue Session</Button>
                  ) : (
                    <Button variant="outline">Join Call</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Consultations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Past Consultations</h3>
        <div className="space-y-3">
          {pastConsultations.map((consult) => (
            <Card key={consult.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{consult.patient}</h4>
                    <p className="text-sm text-text-secondary mt-1">
                      {consult.date} • {consult.duration}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Consultation Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Consultation Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-transparent" variant="outline">
            Schedule New Consultation
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            View Call History
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            Download Consultation Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
