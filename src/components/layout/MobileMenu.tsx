'use client';

import { useState, useEffect } from 'react';
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleSection = (label: string) => {
    setActiveSection(prev => (prev === label ? null : label));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  return (
    <>
      {/* Hamburger button — z-[110] to sit above everything */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[110] p-2 transition-colors text-kinetic-navy hover:text-kinetic-teal"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[105] bg-black/20"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu panel — slides down from top */}
      <div
        className={`fixed left-0 right-0 z-[105] bg-white shadow-xl overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen
            ? 'top-16 bottom-0 opacity-100'
            : 'top-16 bottom-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map(item =>
            item.dropdown ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label)}
                  className="flex items-center justify-between w-full px-4 py-3 font-medium rounded-lg hover:bg-gray-50 transition-colors text-kinetic-navy"
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeSection === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeSection === item.label && (
                  <div className="pl-4 space-y-1 pb-2">
                    {item.items?.map(subItem => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={closeMenu}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-kinetic-teal rounded-lg hover:bg-gray-50 transition-colors"
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
                className="block px-4 py-3 font-medium rounded-lg hover:bg-gray-50 transition-colors text-kinetic-navy"
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
              className="block px-4 py-3 font-medium text-kinetic-navy hover:text-kinetic-teal transition-colors rounded-lg hover:bg-gray-50"
            >
              Login
            </a>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block text-center text-white px-5 py-3 rounded-lg font-semibold transition-colors hover:opacity-90 bg-kinetic-teal"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
