"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmergencyModeProps {
  className?: string;
}

export function EmergencyMode({ className }: EmergencyModeProps) {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const handleEmergencyToggle = () => {
    setIsEmergencyMode(!isEmergencyMode);
    
    // Scroll to top when activating emergency mode
    if (!isEmergencyMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Emergency Button */}
      <Button
        onClick={handleEmergencyToggle}
        variant={isEmergencyMode ? "destructive" : "default"}
        size="lg"
        className={cn(
          "w-full font-semibold transition-all duration-300 ease-out shadow-lg hover:shadow-xl",
          isEmergencyMode
            ? "bg-red-600 hover:bg-red-700 animate-pulse"
            : "bg-red-500 hover:bg-red-600 text-white"
        )}
      >
        <span className="mr-2 text-xl">🚨</span>
        {isEmergencyMode ? "Cancel Emergency Request" : "Emergency - Get Help Now"}
      </Button>

      {/* Emergency Alert Banner */}
      {isEmergencyMode && (
        <Card className="border-2 border-red-500/80 bg-red-50 dark:bg-red-950/20 animate-slide-down shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Alert Header */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-3xl animate-pulse">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-100">
                    Emergency Mode Activated
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                    We're connecting you to emergency services. Help is on the way.
                  </p>
                </div>
              </div>

              {/* Emergency Contact Information */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 space-y-3 border border-red-300/60 dark:border-red-800/60 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Emergency Hotline:
                  </span>
                  <a
                    href="tel:108"
                    className="text-lg font-bold text-red-600 dark:text-red-400 hover:underline"
                  >
                    108
                  </a>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hospital Contact:
                  </span>
                  <a
                    href="tel:+911234567890"
                    className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
                  >
                    +91 123-456-7890
                  </a>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Your Location:</strong> Detected via GPS - Share with emergency services
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300/80 text-red-700 hover:bg-red-50 hover:border-red-400 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30 transition-all duration-300"
                >
                  Call Ambulance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
                >
                  Contact Family
                </Button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Waiting for emergency response...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
