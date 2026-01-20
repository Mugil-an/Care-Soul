"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Notification, NOTIFICATION_TYPE } from "@/lib/types";
import { sampleNotifications } from "@/lib/sample-data";

interface NotificationCenterProps {
  className?: string;
}

// Notification icon component based on type
function NotificationIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    [NOTIFICATION_TYPE.APPOINTMENT]: '📅',
    [NOTIFICATION_TYPE.EMERGENCY]: '🚨',
    [NOTIFICATION_TYPE.REMINDER]: '⏰',
    [NOTIFICATION_TYPE.SYSTEM]: '🔔',
  };
  
  return <span className="text-xl">{icons[type] || '🔔'}</span>;
}

// Format timestamp to relative time
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function NotificationCenter({ className }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2.5 rounded-lg transition-all duration-300 ease-out",
          "hover:bg-surface-secondary/80 text-foreground hover:shadow-sm active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
          isOpen && "bg-surface-secondary/80 shadow-sm"
        )}
        aria-label="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-80 sm:w-96",
            "bg-surface border border-border/60 rounded-xl shadow-xl",
            "animate-slide-down z-50"
          )}
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-border/60 flex items-center justify-between">
            <h3 className="font-semibold text-foreground/95">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary-dark transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-12 text-center text-text-secondary">
                <div className="text-4xl mb-2">🔔</div>
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={cn(
                      "px-4 py-3.5 cursor-pointer transition-all duration-300 ease-out",
                      "hover:bg-surface-secondary/60 active:bg-surface-secondary",
                      !notification.read && "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="shrink-0">
                        <NotificationIcon type={notification.type} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn(
                            "text-sm font-medium",
                            !notification.read ? "text-foreground" : "text-text-secondary"
                          )}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="shrink-0 w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                          )}
                        </div>
                        
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <p className="text-xs text-text-secondary/70 mt-1">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button
                onClick={handleClearAll}
                className="w-full text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
