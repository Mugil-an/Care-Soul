import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

export default function PatientSummary() {
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 32,
      lastVisit: "2026-01-15",
      condition: "Hypertension",
      status: "Stable",
    },
    {
      id: 2,
      name: "Rajesh Patel",
      age: 45,
      lastVisit: "2026-01-18",
      condition: "Diabetes Type 2",
      status: "Improving",
    },
    {
      id: 3,
      name: "Anjali Desai",
      age: 28,
      lastVisit: "2026-01-20",
      condition: "Asthma",
      status: "Stable",
    },
    {
      id: 4,
      name: "Vikram Singh",
      age: 52,
      lastVisit: "2026-01-10",
      condition: "Arthritis",
      status: "Needs Review",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">My Patients</h2>
        <p className="text-text-secondary mb-6">View and manage your patient records and treatment plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-2xl font-bold text-green-700">284</p>
              <p className="text-sm text-green-600">Total Patients</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-2xl font-bold text-blue-700">45</p>
              <p className="text-sm text-blue-600">Active Cases</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="text-2xl font-bold text-yellow-700">8</p>
              <p className="text-sm text-yellow-600">Need Review</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-2xl font-bold text-purple-700">236</p>
              <p className="text-sm text-purple-600">Stable</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <h4 className="font-semibold">{patient.name}</h4>
                      <p className="text-sm text-text-secondary">
                        Age {patient.age} • {patient.condition} • Last visit: {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    patient.status === "Stable" ? "bg-green-100 text-green-700" :
                    patient.status === "Improving" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {patient.status}
                  </span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More Patients</Button>
      </div>
    </div>
  )
}
