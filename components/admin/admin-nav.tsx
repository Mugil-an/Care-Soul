"use client"

interface AdminNavProps {
  activeTab: "dashboard" | "users" | "doctors" | "analytics"
  setActiveTab: (tab: "dashboard" | "users" | "doctors" | "analytics") => void
}

export default function AdminNav({ activeTab, setActiveTab }: AdminNavProps) {
  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: "📊" },
    { id: "users" as const, label: "User Management", icon: "👥" },
    { id: "doctors" as const, label: "Doctor Management", icon: "👨‍⚕️" },
    { id: "analytics" as const, label: "Analytics", icon: "📈" },
  ]

  return (
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
  )
}
