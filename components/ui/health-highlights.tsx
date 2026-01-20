"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HealthHighlight {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

// Healthcare-focused imagery data
const healthHighlights: HealthHighlight[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    alt: "Doctor providing consultation in rural healthcare setting",
    title: "Rural Healthcare Access",
    description: "Bringing quality care to underserved communities",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    alt: "Telemedicine consultation via video call",
    title: "Telemedicine Services",
    description: "Connect with doctors from anywhere",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    alt: "Medical professional reviewing patient records",
    title: "Digital Health Records",
    description: "Your medical history, always accessible",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    alt: "Community health screening program",
    title: "Community Health",
    description: "Regular health screenings and preventive care",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
    alt: "Medical team collaborating on patient care",
    title: "Collaborative Care",
    description: "Multi-specialist approach to your health",
  },
];

interface HealthHighlightsProps {
  className?: string;
  autoplayInterval?: number; // in milliseconds, 0 to disable
}

export function HealthHighlights({ className, autoplayInterval = 0 }: HealthHighlightsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplayInterval > 0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 image
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 images
      } else {
        setItemsPerView(3); // Desktop: 3 images
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, healthHighlights.length - itemsPerView);

  // Navigate to specific index
  const navigateTo = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
  };

  // Navigate left
  const navigateLeft = () => {
    navigateTo(currentIndex - 1);
  };

  // Navigate right
  const navigateRight = () => {
    navigateTo(currentIndex + 1);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Autoplay logic
  useEffect(() => {
    if (isAutoPlaying && !isHovered && autoplayInterval > 0) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          return next > maxIndex ? 0 : next;
        });
      }, autoplayInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, maxIndex, autoplayInterval]);

  return (
    <div className={cn("relative group", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground/95">Health Highlights</h3>
          <p className="text-sm text-text-secondary/80 mt-0.5">
            Discover our healthcare services and community impact
          </p>
        </div>

        {/* Autoplay control */}
        {autoplayInterval > 0 && (
          <button
            onClick={toggleAutoplay}
            className={cn(
              "p-2 rounded-lg transition-all duration-300 ease-out",
              "hover:bg-surface-secondary/60 text-text-secondary hover:text-foreground",
              "opacity-0 group-hover:opacity-100 focus:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-primary/30"
            )}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Image Strip Container */}
      <div
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Button - Left */}
        <button
          onClick={navigateLeft}
          disabled={currentIndex === 0}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-10",
            "w-10 h-10 rounded-full bg-surface/90 dark:bg-surface/80",
            "backdrop-blur-sm border border-border/40",
            "flex items-center justify-center",
            "transition-all duration-300 ease-out",
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            "hover:bg-surface hover:shadow-md hover:scale-105",
            "active:scale-95",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/30"
          )}
          aria-label="Previous images"
        >
          <svg
            className="w-5 h-5 text-foreground/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation Button - Right */}
        <button
          onClick={navigateRight}
          disabled={currentIndex >= maxIndex}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 z-10",
            "w-10 h-10 rounded-full bg-surface/90 dark:bg-surface/80",
            "backdrop-blur-sm border border-border/40",
            "flex items-center justify-center",
            "transition-all duration-300 ease-out",
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            "hover:bg-surface hover:shadow-md hover:scale-105",
            "active:scale-95",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/30"
          )}
          aria-label="Next images"
        >
          <svg
            className="w-5 h-5 text-foreground/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Image Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-hidden"
        >
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {healthHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="shrink-0"
                style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
              >
                <div className="relative group/card overflow-hidden rounded-lg bg-surface-secondary/30 border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={highlight.src}
                      alt={highlight.alt}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Overlay */}
                  {(highlight.title || highlight.description) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 ease-out">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        {highlight.title && (
                          <h4 className="font-semibold text-sm mb-1">{highlight.title}</h4>
                        )}
                        {highlight.description && (
                          <p className="text-xs text-white/90 leading-relaxed">
                            {highlight.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => navigateTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                "hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30",
                currentIndex === index
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-border/60 hover:w-4"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
