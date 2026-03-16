import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")

  const doctors = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "General Physician", rating: 4.8 },
    { id: 2, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", rating: 4.9 },
    { id: 3, name: "Dr. Amit Patel", specialty: "Orthopedic Surgeon", rating: 4.7 },
    { id: 4, name: "Dr. Meera Singh", specialty: "Pediatrician", rating: 4.9 },
  ]

  const availableTimes = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "4:45 PM"]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
        <p className="text-text-secondary mb-6">Select a doctor, date, and time that works best for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Selection */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Select a Doctor</h3>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id.toString())}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDoctor === doctor.id.toString()
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-sm text-text-secondary">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{doctor.rating}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min={new Date().toISOString().split('T')[0]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 text-sm border rounded-md transition-all ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Summary */}
      {(selectedDoctor && selectedDate && selectedTime) && (
        <Card>
          <CardHeader>
            <CardTitle>Appointment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Doctor:</strong> {doctors.find(d => d.id.toString() === selectedDoctor)?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
            </div>
            <Button className="w-full mt-4">Confirm Booking</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
