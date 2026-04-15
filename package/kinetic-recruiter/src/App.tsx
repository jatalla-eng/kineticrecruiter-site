import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Comparison from './components/Comparison';
import NoHiddenCosts from './components/NoHiddenCosts';
import AdditionalFeatures from './components/AdditionalFeatures';
import PricingPreview from './components/PricingPreview';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <NoHiddenCosts />
        <AdditionalFeatures />
        <PricingPreview />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
