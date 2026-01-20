import LoginForm from '@/components/auth/login-form'
import AuthCarousel from '@/components/auth/auth-carousel'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Animated Background - Only visible on mobile */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-600 animate-gradient-flow">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-6 md:p-12 lg:p-16 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                CS
              </div>
              CareSoul
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right Side - Image Carousel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700">
        <AuthCarousel type="login" />
      </div>
    </main>
  )
}
