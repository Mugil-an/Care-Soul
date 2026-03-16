import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { StatusBadge } from "../ui/status-badge"
import { sampleAppointments } from "../../lib/sample-data"

export default function AppointmentsList() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
        <p className="text-text-secondary mb-6">Manage and view all your patient appointments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <p className="text-2xl font-bold text-blue-700">24</p>
              <p className="text-sm text-blue-600">Total Appointments</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-2xl font-bold text-green-700">5</p>
              <p className="text-sm text-green-600">Today</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <p className="text-2xl font-bold text-yellow-700">8</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-2xl font-bold text-purple-700">18</p>
              <p className="text-sm text-purple-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <h4 className="font-semibold">{apt.patientName}</h4>
                      <p className="text-sm text-text-secondary">
                        {apt.type} • {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={apt.status} />
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More Appointments</Button>
      </div>
    </div>
  )
}
