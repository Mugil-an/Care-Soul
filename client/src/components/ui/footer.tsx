import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">About CARE SOUL</h4>
            <p className="text-sm opacity-90">
              Bridging healthcare gaps in rural communities with technology and compassion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Health Records
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Emergency Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75">© 2026 CARE SOUL. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
              Twitter
            </Link>
            <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
              LinkedIn
            </Link>
            <Link to="#" className="opacity-75 hover:opacity-100 transition-opacity">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
