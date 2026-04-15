export default function CTASection() {
  return (
    <section id="trial" className="py-20 md:py-28 bg-gradient-to-br from-kinetic-tealLight via-white to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Ready to stop paying for add-ons?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Start your 7-day free trial with full access to every feature. Enter payment details when you sign up — cancel anytime during the trial at no charge.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
          >
            Start Free Trial
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center text-kinetic-teal hover:text-kinetic-tealDark font-semibold text-lg mt-2 sm:mt-0"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
