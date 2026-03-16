import { useState } from "react"
import { Navbar } from "../components/ui/navbar"
import { Footer } from "../components/ui/footer"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "doctors" | "analytics">("dashboard")

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: "🏠" },
    { id: "users" as const, label: "Users", icon: "👥" },
    { id: "doctors" as const, label: "Doctors", icon: "👨‍⚕️" },
    { id: "analytics" as const, label: "Analytics", icon: "📊" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-surface">
        {/* Admin Navigation */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-foreground"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="opacity-90">Manage users, doctors, and monitor platform performance.</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-sm font-medium">Total Users</p>
                        <p className="text-3xl font-bold mt-2">15,847</p>
                        <p className="text-xs text-green-600 mt-1">+12% this month</p>
                      </div>
                      <div className="text-3xl">👥</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-sm font-medium">Verified Doctors</p>
                        <p className="text-3xl font-bold mt-2">523</p>
                        <p className="text-xs text-blue-600 mt-1">42 pending verification</p>
                      </div>
                      <div className="text-3xl">👨‍⚕️</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-sm font-medium">Appointments</p>
                        <p className="text-3xl font-bold mt-2">8,234</p>
                        <p className="text-xs text-text-secondary mt-1">This month</p>
                      </div>
                      <div className="text-3xl">📅</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-sm font-medium">Platform Uptime</p>
                        <p className="text-3xl font-bold mt-2">99.9%</p>
                        <p className="text-xs text-green-600 mt-1">Last 30 days</p>
                      </div>
                      <div className="text-3xl">✓</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Recent User Registrations</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Rajesh Kumar", email: "rajesh@example.com", date: "Jan 22, 2026" },
                      { name: "Anjali Patel", email: "anjali@example.com", date: "Jan 21, 2026" },
                      { name: "Vikram Singh", email: "vikram@example.com", date: "Jan 20, 2026" },
                    ].map((user, i) => (
                      <Card key={i}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-sm">{user.name}</p>
                              <p className="text-xs text-text-secondary">{user.email}</p>
                              <p className="text-xs text-text-secondary mt-1">{user.date}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Verify
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Pending Doctor Approvals</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Meera Sharma", specialty: "Cardiologist", days: 3 },
                      { name: "Dr. Arjun Verma", specialty: "Orthopedic", days: 5 },
                      { name: "Dr. Priya Nair", specialty: "Pediatrician", days: 2 },
                    ].map((doctor, i) => (
                      <Card key={i}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-sm">{doctor.name}</p>
                              <p className="text-xs text-text-secondary">{doctor.specialty}</p>
                              <p className="text-xs text-yellow-600 mt-1">Waiting {doctor.days} days</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                              <Button size="sm" variant="outline">
                                Deny
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">User Management</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">
                    User management interface - Coming Soon
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Doctor Management</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">
                    Doctor management interface - Coming Soon
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">
                    Analytics dashboard - Coming Soon
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
