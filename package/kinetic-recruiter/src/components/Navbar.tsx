import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from '/logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: 'Features',
      dropdown: true,
      items: [
        { label: 'AI Candidate Intelligence', href: '/features/ai-candidate-intelligence' },
        { label: 'Candidate Intake', href: '/features/candidate-intake' },
        { label: 'Agency Workflow', href: '/features/agency-workflow' },
        { label: 'Team & Platform', href: '/features/team-platform' },
      ],
    },
    {
      label: 'Solutions',
      dropdown: true,
      items: [
        { label: 'Recruitment Agencies', href: '/solutions/recruitment-agencies' },
        { label: 'In-House Talent Teams', href: '/solutions/in-house-teams' },
      ],
    },
    { label: 'Pricing', href: '/pricing', dropdown: false },
    {
      label: 'Resources',
      dropdown: true,
      items: [
        { label: 'Blog', href: '/blog' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Docs', href: '/api-docs' },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src={Logo} alt="KineticRecruiter" className="h-8 md:h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button className="flex items-center px-4 py-2 text-navy hover:text-kinetic-teal font-medium transition-colors">
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-navy hover:text-kinetic-teal font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown */}
                {item.dropdown && item.items && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-navy hover:text-kinetic-teal hover:bg-lightGrey transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://app.kineticrecruiter.com" className="text-navy hover:text-kinetic-teal font-medium transition-colors">
              Login
            </a>
            <a
              href="/pricing"
              className="bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:text-kinetic-teal transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button className="flex items-center justify-between w-full px-4 py-3 text-navy font-medium">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="pl-4 space-y-1">
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-600 hover:text-kinetic-teal"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-navy font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <a href="https://app.kineticrecruiter.com" className="block px-4 py-3 text-navy font-medium">
                Login
              </a>
              <a
                href="/pricing"
                className="block text-center bg-kinetic-teal text-white px-5 py-3 rounded-lg font-semibold"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
