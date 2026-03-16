import { Appointment, Notification } from "./types"
import { APPOINTMENT_STATUS, NOTIFICATION_TYPE } from "./types"

export const sampleAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Priya Sharma",
    date: "2026-01-22",
    time: "10:00 AM",
    type: "General Checkup",
    status: APPOINTMENT_STATUS.APPROVED,
  },
  {
    id: "2",
    patientName: "Rajesh Patel",
    doctorName: "Dr. Priya Sharma",
    date: "2026-01-23",
    time: "2:30 PM",
    type: "Follow-up",
    status: APPOINTMENT_STATUS.PENDING,
  },
  {
    id: "3",
    patientName: "Anjali Desai",
    doctorName: "Dr. Priya Sharma",
    date: "2026-01-24",
    time: "11:15 AM",
    type: "Consultation",
    status: APPOINTMENT_STATUS.APPROVED,
  },
  {
    id: "4",
    patientName: "Vikram Singh",
    doctorName: "Dr. Priya Sharma",
    date: "2026-01-25",
    time: "9:00 AM",
    type: "General Checkup",
    status: APPOINTMENT_STATUS.COMPLETED,
  },
  {
    id: "5",
    patientName: "Priya Nair",
    doctorName: "Dr. Priya Sharma",
    date: "2026-01-26",
    time: "3:45 PM",
    type: "Follow-up",
    status: APPOINTMENT_STATUS.CANCELLED,
  },
]

export const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: NOTIFICATION_TYPE.APPOINTMENT,
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Priya Sharma is scheduled for tomorrow at 10:00 AM",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "2",
    type: NOTIFICATION_TYPE.EMERGENCY,
    title: "Emergency Alert",
    message: "Emergency services contacted for your area. Please stay safe.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "3",
    type: NOTIFICATION_TYPE.REMINDER,
    title: "Medication Reminder",
    message: "Time to take your daily medication",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "4",
    type: NOTIFICATION_TYPE.SYSTEM,
    title: "System Update",
    message: "New features added to your health dashboard",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
]
