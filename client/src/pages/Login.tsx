import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Login() {
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
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                CS
              </div>
              CareSoul
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              <Button className="w-full">Sign In</Button>
              <div className="text-center">
                <Link to="/register" className="text-sm text-primary hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg opacity-90">Access your healthcare dashboard</p>
        </div>
      </div>
    </main>
  )
}
