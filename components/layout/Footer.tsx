import Link from "next/link"

const footerLinks = [
  { name: "Services", href: "/services" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
]

const legalLinks = [
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms of Service", href: "/legal/terms" },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-serif font-bold text-gray-900 mb-4 block">
              TechAware
            </Link>
            <p className="text-gray-600 max-w-sm">
              Technology consulting and education for the modern enterprise. Building the future, one solution at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-mckinsey-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@techaware.com" className="text-gray-600 hover:text-mckinsey-600 transition-colors">
                  hello@techaware.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mckinsey-600 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mckinsey-600 transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} TechAware. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-mckinsey-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
