import { Appointment, Notification, APPOINTMENT_STATUS, NOTIFICATION_TYPE, DoctorAvailability, TIME_SLOT, DAY_OF_WEEK } from "./types";

// Sample Appointments
export const sampleAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Priya Sharma',
    date: '2026-01-22',
    time: '10:00 AM',
    type: 'General Checkup',
    status: APPOINTMENT_STATUS.APPROVED,
  },
  {
    id: '2',
    patientName: 'John Smith',
    doctorName: 'Dr. Rajesh Kumar',
    date: '2026-01-18',
    time: '2:30 PM',
    type: 'Follow-up',
    status: APPOINTMENT_STATUS.PENDING,
  },
  {
    id: '3',
    patientName: 'Mary Williams',
    doctorName: 'Dr. Anjali Reddy',
    date: '2026-01-10',
    time: '11:00 AM',
    type: 'Consultation',
    status: APPOINTMENT_STATUS.COMPLETED,
  },
  {
    id: '4',
    patientName: 'Robert Brown',
    doctorName: 'Dr. Priya Sharma',
    date: '2026-01-15',
    time: '3:00 PM',
    type: 'Lab Results Review',
    status: APPOINTMENT_STATUS.CANCELLED,
  },
];

// Sample Notifications
export const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: NOTIFICATION_TYPE.APPOINTMENT,
    title: 'Appointment Approved',
    message: 'Your appointment with Dr. Priya Sharma on Jan 22 has been approved.',
    timestamp: '2026-01-15T10:30:00',
    read: false,
  },
  {
    id: '2',
    type: NOTIFICATION_TYPE.REMINDER,
    title: 'Upcoming Appointment',
    message: 'You have an appointment tomorrow at 10:00 AM with Dr. Priya Sharma.',
    timestamp: '2026-01-14T09:00:00',
    read: false,
  },
  {
    id: '3',
    type: NOTIFICATION_TYPE.SYSTEM,
    title: 'Lab Results Available',
    message: 'Your recent lab results are now available in your health records.',
    timestamp: '2026-01-13T14:20:00',
    read: true,
  },
  {
    id: '4',
    type: NOTIFICATION_TYPE.EMERGENCY,
    title: 'Emergency Alert',
    message: 'Emergency services are available 24/7. Tap for immediate assistance.',
    timestamp: '2026-01-12T08:15:00',
    read: true,
  },
];

// Sample Doctor Availability
export const sampleDoctorAvailability: DoctorAvailability[] = [
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.MONDAY,
    slots: {
      [TIME_SLOT.MORNING]: true,
      [TIME_SLOT.AFTERNOON]: true,
      [TIME_SLOT.EVENING]: false,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.TUESDAY,
    slots: {
      [TIME_SLOT.MORNING]: true,
      [TIME_SLOT.AFTERNOON]: false,
      [TIME_SLOT.EVENING]: true,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.WEDNESDAY,
    slots: {
      [TIME_SLOT.MORNING]: true,
      [TIME_SLOT.AFTERNOON]: true,
      [TIME_SLOT.EVENING]: true,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.THURSDAY,
    slots: {
      [TIME_SLOT.MORNING]: false,
      [TIME_SLOT.AFTERNOON]: true,
      [TIME_SLOT.EVENING]: true,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.FRIDAY,
    slots: {
      [TIME_SLOT.MORNING]: true,
      [TIME_SLOT.AFTERNOON]: true,
      [TIME_SLOT.EVENING]: false,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.SATURDAY,
    slots: {
      [TIME_SLOT.MORNING]: true,
      [TIME_SLOT.AFTERNOON]: false,
      [TIME_SLOT.EVENING]: false,
    },
  },
  {
    doctorId: 'dr-priya-sharma',
    day: DAY_OF_WEEK.SUNDAY,
    slots: {
      [TIME_SLOT.MORNING]: false,
      [TIME_SLOT.AFTERNOON]: false,
      [TIME_SLOT.EVENING]: false,
    },
  },
];
