import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

export default function HealthRecords() {
  const records = [
    {
      id: 1,
      type: "Lab Report",
      title: "Blood Test Results",
      date: "2026-01-15",
      doctor: "Dr. Priya Sharma",
      status: "Normal",
    },
    {
      id: 2,
      type: "Prescription",
      title: "Antibiotics Course",
      date: "2026-01-10",
      doctor: "Dr. Rajesh Kumar",
      status: "Completed",
    },
    {
      id: 3,
      type: "X-Ray",
      title: "Chest X-Ray",
      date: "2025-12-28",
      doctor: "Dr. Amit Patel",
      status: "Clear",
    },
    {
      id: 4,
      type: "Consultation",
      title: "General Checkup",
      date: "2025-12-15",
      doctor: "Dr. Priya Sharma",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Health Records</h2>
        <p className="text-text-secondary mb-6">Access your medical history, test results, and prescriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-2xl font-bold text-green-700">{records.length}</p>
              <p className="text-sm text-green-600">Total Records</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🧪</div>
              <p className="text-2xl font-bold text-blue-700">8</p>
              <p className="text-sm text-blue-600">Lab Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💊</div>
              <p className="text-2xl font-bold text-purple-700">12</p>
              <p className="text-sm text-purple-600">Prescriptions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-2xl font-bold text-orange-700">5</p>
              <p className="text-sm text-orange-600">Scans</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {record.type === "Lab Report" && "🧪"}
                      {record.type === "Prescription" && "💊"}
                      {record.type === "X-Ray" && "📷"}
                      {record.type === "Consultation" && "👨‍⚕️"}
                    </div>
                    <div>
                      <h4 className="font-semibold">{record.title}</h4>
                      <p className="text-sm text-text-secondary">
                        {record.type} • {record.date} • {record.doctor}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === "Normal" || record.status === "Clear" || record.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {record.status}
                  </span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More Records</Button>
      </div>
    </div>
  )
}
