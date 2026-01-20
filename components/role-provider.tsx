"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole, USER_ROLE, User } from "@/lib/types";

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isRole: (role: UserRole) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Sample users for each role
const sampleUsers: Record<UserRole, User> = {
  [USER_ROLE.PATIENT]: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: USER_ROLE.PATIENT,
  },
  [USER_ROLE.DOCTOR]: {
    id: '2',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@caresoul.com',
    role: USER_ROLE.DOCTOR,
  },
  [USER_ROLE.ADMIN]: {
    id: '3',
    name: 'Admin User',
    email: 'admin@caresoul.com',
    role: USER_ROLE.ADMIN,
  },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  // Default to patient role
  const [currentRole, setCurrentRole] = useState<UserRole>(USER_ROLE.PATIENT);
  const [currentUser, setCurrentUser] = useState<User | null>(sampleUsers[USER_ROLE.PATIENT]);

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(sampleUsers[role]);
  };

  const isRole = (role: UserRole) => currentRole === role;

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole: handleSetRole,
        currentUser,
        setCurrentUser,
        isRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
