"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DoctorAvailability, TimeSlot, TIME_SLOT, DAY_OF_WEEK, DayOfWeek } from "@/lib/types";
import { sampleDoctorAvailability } from "@/lib/sample-data";

interface AvailabilityCalendarProps {
  doctorId?: string;
  className?: string;
  onSlotSelect?: (day: DayOfWeek, slot: TimeSlot) => void;
}

const timeSlotLabels: Record<TimeSlot, string> = {
  [TIME_SLOT.MORNING]: 'Morning',
  [TIME_SLOT.AFTERNOON]: 'Afternoon',
  [TIME_SLOT.EVENING]: 'Evening',
};

const timeSlotTimes: Record<TimeSlot, string> = {
  [TIME_SLOT.MORNING]: '9:00 AM - 12:00 PM',
  [TIME_SLOT.AFTERNOON]: '12:00 PM - 5:00 PM',
  [TIME_SLOT.EVENING]: '5:00 PM - 8:00 PM',
};

export function AvailabilityCalendar({ 
  doctorId = 'dr-priya-sharma', 
  className,
  onSlotSelect 
}: AvailabilityCalendarProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ day: DayOfWeek; slot: TimeSlot } | null>(null);
  
  // Get availability data for the doctor
  const availabilityData = sampleDoctorAvailability.filter(a => a.doctorId === doctorId);
  
  // Create a map for quick lookup
  const availabilityMap = new Map<DayOfWeek, DoctorAvailability>();
  availabilityData.forEach(item => {
    availabilityMap.set(item.day, item);
  });

  const days = Object.values(DAY_OF_WEEK);
  const slots = Object.values(TIME_SLOT);

  const handleSlotClick = (day: DayOfWeek, slot: TimeSlot, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    setSelectedSlot({ day, slot });
    onSlotSelect?.(day, slot);
  };

  const isSlotAvailable = (day: DayOfWeek, slot: TimeSlot): boolean => {
    const dayAvailability = availabilityMap.get(day);
    return dayAvailability?.slots[slot] || false;
  };

  const isSelected = (day: DayOfWeek, slot: TimeSlot): boolean => {
    return selectedSlot?.day === day && selectedSlot?.slot === slot;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-foreground/95">Weekly Availability</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded"></div>
            <span className="text-text-secondary">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"></div>
            <span className="text-text-secondary">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-border/60 rounded-xl overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-surface-secondary/80 border-b border-border/60">
          <div className="p-3 font-medium text-sm text-foreground border-r border-border/60">
            Day
          </div>
          {slots.map((slot) => (
            <div 
              key={slot} 
              className="p-3 text-center font-medium text-sm text-foreground border-r last:border-r-0 border-border/60"
            >
              <div>{timeSlotLabels[slot]}</div>
              <div className="text-xs text-text-secondary font-normal mt-0.5">
                {timeSlotTimes[slot]}
              </div>
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {days.map((day) => (
            <div key={day} className="grid grid-cols-4">
              {/* Day Label */}
              <div className="p-3 font-medium text-sm text-foreground bg-surface-secondary border-r border-border flex items-center">
                {day}
              </div>

              {/* Time Slots */}
              {slots.map((slot) => {
                const available = isSlotAvailable(day, slot);
                const selected = isSelected(day, slot);

                return (
                  <button
                    key={`${day}-${slot}`}
                    onClick={() => handleSlotClick(day, slot, available)}
                    disabled={!available}
                    className={cn(
                      "p-3 border-r last:border-r-0 border-border/60",
                      "transition-all duration-300 ease-out",
                      "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset",
                      available
                        ? cn(
                            "cursor-pointer",
                            "bg-green-50 dark:bg-green-950/20",
                            "hover:bg-green-100 dark:hover:bg-green-900/40 hover:shadow-sm",
                            "text-green-700 dark:text-green-300",
                            selected && "ring-2 ring-primary ring-inset bg-green-100 dark:bg-green-900/50 shadow-sm"
                          )
                        : cn(
                            "cursor-not-allowed",
                            "bg-gray-50 dark:bg-gray-900/20",
                            "text-gray-400 dark:text-gray-600"
                          )
                    )}
                  >
                    <div className="flex items-center justify-center h-full">
                      {available ? (
                        <span className="text-sm">✓</span>
                      ) : (
                        <span className="text-sm">—</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Slot Info */}
      {selectedSlot && (
        <div className="p-4 bg-primary/10 dark:bg-primary/5 border border-primary/30 rounded-xl animate-slide-up shadow-sm">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Selected:</span>{" "}
            {selectedSlot.day}, {timeSlotLabels[selectedSlot.slot]}{" "}
            <span className="text-text-secondary">({timeSlotTimes[selectedSlot.slot]})</span>
          </p>
        </div>
      )}
    </div>
  );
}
