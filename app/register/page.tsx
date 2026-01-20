import RegisterForm from '@/components/auth/register-form'
import AuthCarousel from '@/components/auth/auth-carousel'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Animated Background - Only visible on mobile */}
      <div className="lg:hidden absolute inset-0 bg-linear-to-br from-teal-600 via-blue-500 to-cyan-600 animate-gradient-flow">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-6 md:p-12 lg:p-16 bg-linear-to-br from-gray-50 to-white relative z-10">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                CS
              </div>
              CareSoul
            </Link>
          </div>
          <RegisterForm />
        </div>
      </div>

      {/* Right Side - Image Carousel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-linear-to-br from-teal-600 via-blue-600 to-cyan-700">
        <AuthCarousel type="register" />
      </div>
    </main>
  )
}
