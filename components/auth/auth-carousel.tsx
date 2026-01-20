'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface AuthCarouselProps {
  type: 'login' | 'register'
}

export default function AuthCarousel({ type }: AuthCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const loginSlides = [
    {
      title: 'Welcome Back',
      description: 'Access your medical records and appointments anytime, anywhere.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      alt: 'Doctor consulting with patient'
    },
    {
      title: 'Track Your Health',
      description: 'Monitor your wellness journey with comprehensive health tracking tools.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
      alt: 'Health monitoring dashboard'
    },
    {
      title: 'Expert Care',
      description: 'Connect with qualified healthcare professionals from the comfort of your home.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop',
      alt: 'Medical professional'
    }
  ]

  const registerSlides = [
    {
      title: 'Start Your Journey',
      description: 'Join thousands who trust CareSoul for their healthcare management.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
      alt: 'Healthcare team'
    },
    {
      title: 'Comprehensive Care',
      description: 'Get personalized health insights and preventive care recommendations.',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop',
      alt: 'Modern hospital facility'
    },
    {
      title: 'Always Available',
      description: '24/7 access to your health information and emergency support services.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
      alt: 'Medical consultation'
    }
  ]

  const slides = type === 'login' ? loginSlides : registerSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Main Carousel Container with Real Images */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Image Container */}
        <div className="relative h-125">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute'
              }`}
            >
              <h2 className="text-3xl font-bold mb-3">
                {slide.title}
              </h2>
              <p className="text-lg text-white/90 max-w-lg">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-white/90 text-center">
        <div>
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-sm">Active Users</div>
        </div>
        <div>
          <div className="text-2xl font-bold">500+</div>
          <div className="text-sm">Doctors</div>
        </div>
        <div>
          <div className="text-2xl font-bold">4.9★</div>
          <div className="text-sm">Rating</div>
        </div>
      </div>
    </div>
  )
}
