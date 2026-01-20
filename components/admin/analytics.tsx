"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>
        <p className="text-text-secondary mb-6">Monitor key performance metrics and platform statistics.</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 bg-surface-secondary rounded-lg flex items-center justify-center text-text-secondary">
                [Chart Placeholder: Monthly User Growth]
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-primary">+12%</span> growth this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appointment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 bg-surface-secondary rounded-lg flex items-center justify-center text-text-secondary">
                [Chart Placeholder: Weekly Appointments]
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-accent">8,234</span> appointments this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 bg-surface-secondary rounded-lg flex items-center justify-center text-text-secondary">
                [Chart Placeholder: Uptime & Response Time]
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-green-600">99.9%</span> uptime maintained
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Active Users (Today)</span>
              <span className="text-lg font-bold text-primary">3,547</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Avg. Session Duration</span>
              <span className="text-lg font-bold text-primary">12 min 34 sec</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Conversion Rate</span>
              <span className="text-lg font-bold text-primary">4.2%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">Avg. Booking Value</span>
              <span className="text-lg font-bold text-primary">₹850</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Total Consultations</span>
              <span className="text-lg font-bold text-primary">28,456</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Avg. Consultation Rating</span>
              <span className="text-lg font-bold text-primary">4.7 / 5.0</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">On-Time Completion</span>
              <span className="text-lg font-bold text-primary">96%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">Patient Satisfaction</span>
              <span className="text-lg font-bold text-primary">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "New doctor registration", details: "Dr. Suresh Mehra - Pediatrician", time: "2 hours ago" },
              { action: "User account suspended", details: "User ID: 8847 - Violation of ToS", time: "5 hours ago" },
              { action: "System maintenance completed", details: "Database optimization", time: "1 day ago" },
              {
                action: "New feature deployed",
                details: "Video consultation recording enabled",
                time: "2 days ago",
              },
              { action: "Security patch applied", details: "Critical vulnerability fix", time: "3 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b last:border-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{activity.action}</p>
                  <p className="text-xs text-text-secondary">{activity.details}</p>
                </div>
                <p className="text-xs text-text-secondary whitespace-nowrap">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
