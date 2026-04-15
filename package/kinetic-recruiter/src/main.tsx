import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import './index.css'
import App from './App.tsx'
import PricingPage from './pages/PricingPage.tsx'
import SolutionsAgencies from './pages/SolutionsAgencies.tsx'
import SolutionsInHouse from './pages/SolutionsInHouse.tsx'
import FeatureAI from './pages/FeatureAI.tsx'
import FeatureIntake from './pages/FeatureIntake.tsx'
import FeatureAgency from './pages/FeatureAgency.tsx'
import FeatureTeam from './pages/FeatureTeam.tsx'
import BlogListing from './pages/BlogListing.tsx'
import BlogPostComparison from './pages/BlogPostComparison.tsx'
import BlogPostAI from './pages/BlogPostAI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/solutions/recruitment-agencies" element={<SolutionsAgencies />} />
          <Route path="/solutions/in-house-teams" element={<SolutionsInHouse />} />
          <Route path="/features/ai-candidate-intelligence" element={<FeatureAI />} />
          <Route path="/features/candidate-intake" element={<FeatureIntake />} />
          <Route path="/features/agency-workflow" element={<FeatureAgency />} />
          <Route path="/features/team-platform" element={<FeatureTeam />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/best-ats-for-recruitment-agencies-2026" element={<BlogPostComparison />} />
          <Route path="/blog/ai-changing-recruitment-agencies-2026" element={<BlogPostAI />} />
          <Route path="/docs" element={<ComingSoon title="Documentation" />} />
          <Route path="/api-docs" element={<ComingSoon title="API Documentation" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-kinetic-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-kinetic-tealLight">Coming soon</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">This page is under construction. Please check back later.</p>
      </div>
    </div>
  )
}