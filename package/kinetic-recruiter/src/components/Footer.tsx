import Logo from '/logo-footer.png';

export default function Footer() {
  const footerLinks = {
    product: [
      { label: 'Features', href: '/features/ai-candidate-intelligence' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Chrome Extension', href: '#extension' },
      { label: 'Help Centre', href: '#help' },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  };

  return (
    <footer className="bg-navy py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={Logo} alt="KineticRecruiter" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 mb-6 max-w-sm">
              AI-powered ATS for recruitment agencies.
            </p>
            <div className="flex gap-4">
              <a
                href="#linkedin"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 border-t border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a
              href="/pricing"
              className="bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#demo"
              className="text-kinetic-teal hover:text-white transition-colors font-medium"
            >
              Book a Demo
            </a>
            <a
              href="mailto:support@kineticrecruiter.com"
              className="text-gray-400 hover:text-white transition-colors sm:ml-auto"
            >
              support@kineticrecruiter.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2026 KineticRecruiter. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
