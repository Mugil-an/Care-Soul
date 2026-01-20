import { cn } from "@/lib/utils";
import { AppointmentStatus, APPOINTMENT_STATUS } from "@/lib/types";

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

// Status configuration with colors and labels
const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  [APPOINTMENT_STATUS.PENDING]: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
  [APPOINTMENT_STATUS.APPROVED]: {
    label: 'Approved',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  [APPOINTMENT_STATUS.COMPLETED]: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
  [APPOINTMENT_STATUS.CANCELLED]: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ease-out shadow-sm",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
