"use client";

import { useRole } from "@/components/role-provider";
import { USER_ROLE } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RoleSwitcherProps {
  className?: string;
}

export function RoleSwitcher({ className }: RoleSwitcherProps) {
  const { currentRole, setCurrentRole } = useRole();

  const roles = [
    { value: USER_ROLE.PATIENT, label: 'Patient', icon: '🧑‍⚕️' },
    { value: USER_ROLE.DOCTOR, label: 'Doctor', icon: '👨‍⚕️' },
    { value: USER_ROLE.ADMIN, label: 'Admin', icon: '⚙️' },
  ];

  return (
    <div className={cn("inline-flex items-center gap-2 p-1.5 bg-surface-secondary/60 rounded-xl shadow-sm border border-border/40", className)}>
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => setCurrentRole(role.value)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out",
            "hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
            currentRole === role.value
              ? "bg-primary text-white shadow-md scale-[1.02]"
              : "text-text-secondary hover:text-foreground hover:shadow-sm active:scale-95"
          )}
        >
          <span className="mr-1.5">{role.icon}</span>
          {role.label}
        </button>
      ))}
    </div>
  );
}
