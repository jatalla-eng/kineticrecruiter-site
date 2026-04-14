import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import MobileMenu from './MobileMenu';

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
  {
    label: 'Pricing',
    href: '/pricing',
    dropdown: false,
  },
  {
    label: 'Resources',
    dropdown: true,
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="KineticRecruiter"
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative group">
                  <button
                    className="flex items-center px-4 py-2 font-medium transition-colors text-kinetic-navy"
                  >
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown — CSS-only hover, no useState */}
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50 text-kinetic-navy"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-4 py-2 font-medium transition-colors text-kinetic-navy hover:text-kinetic-teal"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA — always visible per D-09 */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://app.kineticrecruiter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors text-kinetic-navy hover:text-kinetic-teal"
            >
              Login
            </a>
            <Link
              href="/pricing"
              className="text-white px-5 py-2.5 rounded-lg font-semibold transition-colors hover:opacity-90 bg-kinetic-teal"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile menu — client component handles toggle */}
          <div className="lg:hidden">
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
