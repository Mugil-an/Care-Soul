import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { RoleProvider } from "./components/role-provider"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PatientPortal from "./pages/PatientPortal"
import DoctorPortal from "./pages/DoctorPortal"
import AdminPanel from "./pages/AdminPanel"
import Demo from "./pages/Demo"

function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/patient" element={<PatientPortal />} />
              <Route path="/doctor" element={<DoctorPortal />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </div>
        </Router>
      </RoleProvider>
    </ThemeProvider>
  )
}

export default App
