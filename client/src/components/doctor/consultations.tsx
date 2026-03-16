import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

export default function Consultations() {
  const consultations = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "2:00 PM - 2:30 PM",
      type: "Video Call",
      status: "Scheduled",
      emergency: false,
    },
    {
      id: 2,
      patient: "Rajesh Patel",
      time: "3:00 PM - 3:45 PM",
      type: "Video Call",
      status: "In Progress",
      emergency: false,
    },
    {
      id: 3,
      patient: "Emergency - Unknown",
      time: "Now",
      type: "Emergency Call",
      status: "Active",
      emergency: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Consultations</h2>
        <p className="text-text-secondary mb-6">Manage video consultations and emergency calls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎥</div>
              <p className="text-2xl font-bold text-green-700">12</p>
              <p className="text-sm text-green-600">Today</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-2xl font-bold text-blue-700">2</p>
              <p className="text-sm text-blue-600">Active</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚨</div>
              <p className="text-2xl font-bold text-red-700">1</p>
              <p className="text-sm text-red-600">Emergency</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-2xl font-bold text-purple-700">156</p>
              <p className="text-sm text-purple-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {consultations.map((consultation) => (
          <Card key={consultation.id} className={
            consultation.emergency ? "border-red-200 bg-red-50" : ""
          }>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    consultation.emergency ? "bg-red-100" : "bg-primary/10"
                  }`}>
                    {consultation.type === "Video Call" && "🎥"}
                    {consultation.type === "Emergency Call" && "🚨"}
                  </div>
                  <div>
                    <h4 className="font-semibold">{consultation.patient}</h4>
                    <p className="text-sm text-text-secondary">
                      {consultation.type} • {consultation.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    consultation.status === "Active" ? "bg-red-100 text-red-700" :
                    consultation.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {consultation.status}
                  </span>
                  {consultation.status === "Scheduled" && (
                    <Button size="sm">Start Call</Button>
                  )}
                  {consultation.status === "In Progress" && (
                    <Button size="sm" variant="outline">Join Call</Button>
                  )}
                  {consultation.status === "Active" && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">Emergency</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              🎥 Start New Consultation
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              📞 Schedule Call
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              📋 View History
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              ⚙️ Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
