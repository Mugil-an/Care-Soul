"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmergencyMode } from "@/components/ui/emergency-mode";
import { AvailabilityCalendar } from "@/components/ui/availability-calendar";
import { HealthHighlights } from "@/components/ui/health-highlights";
import { useRole } from "@/components/role-provider";
import { sampleAppointments, sampleNotifications } from "@/lib/sample-data";
import { APPOINTMENT_STATUS, USER_ROLE } from "@/lib/types";

export default function DemoPage() {
  const { currentRole, currentUser } = useRole();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground/95 mb-4">
              CARE SOUL Features
            </h1>
            <p className="text-lg text-text-secondary/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore all the new features added to the healthcare platform
            </p>
            
            {/* Role Switcher */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="text-sm text-text-secondary/80">
                Switch between roles to experience different features:
              </div>
              <RoleSwitcher />
              <div className="text-sm text-foreground/90 font-medium px-4 py-2 bg-surface-secondary/60 rounded-lg">
                Currently viewing as: {currentUser?.name} ({currentRole})
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Feature 1: Appointment Status System */}
            <section className="animate-slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <Card>
                <CardHeader>
                  <CardTitle>1. Smart Appointment Status System</CardTitle>
                  <CardDescription>
                    Color-coded status badges for tracking appointment states
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleAppointments.map((apt) => (
                      <Card key={apt.id} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold">{apt.doctorName}</h4>
                              <p className="text-sm text-text-secondary">{apt.type}</p>
                              <p className="text-sm mt-2">
                                {new Date(apt.date).toLocaleDateString()} at {apt.time}
                              </p>
                            </div>
                            <StatusBadge status={apt.status} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Available Status Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={APPOINTMENT_STATUS.PENDING} />
                      <StatusBadge status={APPOINTMENT_STATUS.APPROVED} />
                      <StatusBadge status={APPOINTMENT_STATUS.COMPLETED} />
                      <StatusBadge status={APPOINTMENT_STATUS.CANCELLED} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feature 2: Emergency Mode */}
            {currentRole === USER_ROLE.PATIENT && (
              <section className="animate-slide-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <Card>
                  <CardHeader>
                    <CardTitle>2. Emergency Mode (Patient Only)</CardTitle>
                    <CardDescription>
                      Quick access to emergency services with clear UI feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmergencyMode />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Feature 3: Notification Center */}
            <section className="animate-slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <Card>
                <CardHeader>
                  <CardTitle>3. Notification Center</CardTitle>
                  <CardDescription>
                    Check the bell icon in the navbar to see notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-text-secondary">
                      Recent notifications ({sampleNotifications.filter(n => !n.read).length} unread):
                    </p>
                    <div className="space-y-2">
                      {sampleNotifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 border border-border rounded-lg bg-surface-secondary"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl">
                              {notification.type === 'appointment' ? '📅' : 
                               notification.type === 'emergency' ? '🚨' :
                               notification.type === 'reminder' ? '⏰' : '🔔'}
                            </span>
                            <div className="flex-1">
                              <h5 className="text-sm font-medium">{notification.title}</h5>
                              <p className="text-xs text-text-secondary mt-1">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feature 4: Role-Based UI */}
            <section className="animate-slide-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <Card>
                <CardHeader>
                  <CardTitle>4. Role-Based UI Rendering</CardTitle>
                  <CardDescription>
                    Different experiences for Patient, Doctor, and Admin roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Role: {currentRole}</h4>
                    <p className="text-sm text-text-secondary">
                      {currentRole === USER_ROLE.PATIENT && 
                        "As a patient, you can book appointments, view health records, and access emergency services."}
                      {currentRole === USER_ROLE.DOCTOR && 
                        "As a doctor, you can manage appointments, view patient summaries, and update availability."}
                      {currentRole === USER_ROLE.ADMIN && 
                        "As an admin, you can manage users, doctors, and view system analytics."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={currentRole === USER_ROLE.PATIENT ? 'border-primary border-2' : ''}>
                      <CardContent className="pt-6">
                        <h5 className="font-semibold mb-2">👤 Patient Features</h5>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• Book appointments</li>
                          <li>• Emergency mode</li>
                          <li>• Health records</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className={currentRole === USER_ROLE.DOCTOR ? 'border-primary border-2' : ''}>
                      <CardContent className="pt-6">
                        <h5 className="font-semibold mb-2">👨‍⚕️ Doctor Features</h5>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• Manage appointments</li>
                          <li>• Patient summaries</li>
                          <li>• Set availability</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className={currentRole === USER_ROLE.ADMIN ? 'border-primary border-2' : ''}>
                      <CardContent className="pt-6">
                        <h5 className="font-semibold mb-2">⚙️ Admin Features</h5>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• User management</li>
                          <li>• System analytics</li>
                          <li>• Doctor management</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feature 5: Availability Calendar */}
            {(currentRole === USER_ROLE.DOCTOR || currentRole === USER_ROLE.PATIENT) && (
              <section className="animate-slide-up" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
                <Card>
                  <CardHeader>
                    <CardTitle>5. Doctor Availability Calendar</CardTitle>
                    <CardDescription>
                      {currentRole === USER_ROLE.DOCTOR 
                        ? "Manage your weekly availability schedule"
                        : "View doctor's available time slots"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AvailabilityCalendar 
                      onSlotSelect={(day, slot) => {
                        console.log(`Selected: ${day} - ${slot}`);
                      }}
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Feature 6: Health Highlights */}
            <section className="animate-slide-up" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
              <Card>
                <CardHeader>
                  <CardTitle>6. Health Highlights Image Strip</CardTitle>
                  <CardDescription>
                    Dynamic healthcare content carousel with smooth navigation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HealthHighlights autoplayInterval={5000} />
                </CardContent>
              </Card>
            </section>

            {/* Implementation Notes */}
            <section className="animate-slide-up" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>📝 Implementation Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-text-secondary">
                  <p>
                    <strong>✅ All Features Ready:</strong> All components are modular and can be integrated into existing pages.
                  </p>
                  <p>
                    <strong>🎨 Theme Support:</strong> All components work seamlessly in both light and dark modes.
                  </p>
                  <p>
                    <strong>📱 Responsive:</strong> Mobile-friendly design with proper breakpoints.
                  </p>
                  <p>
                    <strong>🔌 Backend Ready:</strong> State management is frontend-only but structured to easily connect to real APIs.
                  </p>
                  <p>
                    <strong>♿ Accessible:</strong> Proper ARIA labels and keyboard navigation support.
                  </p>
                  <p>
                    <strong>🖼️ Healthcare Imagery:</strong> Custom image carousel with professional healthcare content.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
