'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href?: string;
  dropdown: boolean;
  items?: { label: string; href: string }[];
}

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setActiveSection((prev) => (prev === label ? null : label));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 transition-colors hover:text-[#0d8488]"
        style={{ color: '#1a2332' }}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto" style={{ top: '64px' }}>
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className="flex items-center justify-between w-full px-4 py-3 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: '#1a2332' }}
                  >
                    {item.label}
                    <ChevronDown
                      className="w-4 h-4 transition-transform"
                      style={{
                        transform:
                          activeSection === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {activeSection === item.label && (
                    <div className="pl-4 space-y-1 pb-2">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0d8488] rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={closeMenu}
                  className="block px-4 py-3 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: '#1a2332' }}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
              <a
                href="https://app.kineticrecruiter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block px-4 py-3 font-medium hover:text-[#0d8488] transition-colors rounded-lg hover:bg-gray-50"
                style={{ color: '#1a2332' }}
              >
                Login
              </a>
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="block text-center text-white px-5 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                style={{ backgroundColor: '#0d8488' }}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
