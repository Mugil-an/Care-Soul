'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return ''
    if (password.length < 6) return 'weak'
    if (password.length < 10) {
      // Check for mix of characters
      const hasNumbers = /\d/.test(password)
      const hasLetters = /[a-zA-Z]/.test(password)
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      
      if (hasNumbers && hasLetters && hasSpecial) return 'strong'
      if ((hasNumbers && hasLetters) || (hasNumbers && hasSpecial) || (hasLetters && hasSpecial)) return 'medium'
      return 'weak'
    }
    return 'strong'
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Shake animation for errors
      const form = e.currentTarget as HTMLFormElement
      form.classList.add('animate-shake')
      setTimeout(() => form.classList.remove('animate-shake'), 500)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Show success message and redirect
      setTimeout(() => {
        // TODO: Redirect to dashboard after successful registration
        router.push('/login') // Redirect to login for now
      }, 1500)
    }, 2000)
  }

  // Get password strength color
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="w-full max-w-md animate-fadeInUp">
      {/* Card with glassmorphism effect */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-teal-500 to-blue-500 rounded-full mb-4 animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join CareSoul for better healthcare</p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Account created successfully! Redirecting...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                formData.fullName
                  ? '-top-2.5 text-xs bg-white px-1 text-teal-600'
                  : 'top-3.5 text-gray-500'
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } hover:border-teal-400`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                formData.email
                  ? '-top-2.5 text-xs bg-white px-1 text-teal-600'
                  : 'top-3.5 text-gray-500'
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } hover:border-teal-400`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <label
              htmlFor="phone"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                formData.phone
                  ? '-top-2.5 text-xs bg-white px-1 text-teal-600'
                  : 'top-3.5 text-gray-500'
              }`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=""
              className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } hover:border-teal-400`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                formData.password
                  ? '-top-2.5 text-xs bg-white px-1 text-teal-600'
                  : 'top-3.5 text-gray-500'
              }`}
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } hover:border-teal-400`}
            />
            {/* Show/Hide Password Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  <div className={`h-1.5 flex-1 rounded transition-all duration-300 ${passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? getStrengthColor() : 'bg-gray-300'}`} />
                  <div className={`h-1.5 flex-1 rounded transition-all duration-300 ${passwordStrength === 'medium' || passwordStrength === 'strong' ? getStrengthColor() : 'bg-gray-300'}`} />
                  <div className={`h-1.5 flex-1 rounded transition-all duration-300 ${passwordStrength === 'strong' ? getStrengthColor() : 'bg-gray-300'}`} />
                </div>
                <p className={`text-xs ${
                  passwordStrength === 'weak' ? 'text-red-600' :
                  passwordStrength === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  Password strength: {passwordStrength}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                formData.confirmPassword
                  ? '-top-2.5 text-xs bg-white px-1 text-teal-600'
                  : 'top-3.5 text-gray-500'
              }`}
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } hover:border-teal-400`}
            />
            {/* Show/Hide Password Toggle */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-600 transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                  errors.agreeToTerms ? 'border-red-500' : 'border-gray-300'
                } peer-checked:bg-teal-500 peer-checked:border-teal-500 group-hover:border-teal-400`}>
                  {formData.agreeToTerms && (
                    <svg className="w-4 h-4 text-white animate-scaleIn" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700 group-hover:text-teal-600 transition-colors">
                I agree to the{' '}
                <Link href="#" className="text-teal-600 hover:underline font-semibold">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-teal-600 hover:underline font-semibold">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center gap-1">
                <span>⚠</span> {errors.agreeToTerms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full py-3.5 bg-linear-to-r from-teal-500 to-blue-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </>
            ) : isSuccess ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Success!
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-600 text-sm mt-6">
        © 2026 CareSoul. Your health, our priority.
      </p>
    </div>
  )
}
