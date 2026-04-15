import { ArrowRight, Clock, Tag, Scale, Sparkles } from 'lucide-react'
import Layout from './Layout'

const blogPosts = [
  {
    slug: 'best-ats-for-recruitment-agencies-2026',
    title: 'The Best ATS for Recruitment Agencies in 2026: An Honest Comparison',
    excerpt: 'Compare the top ATS platforms for recruitment agencies in 2026. See how KineticRecruiter, Bullhorn, Manatal, and Recruiterflow stack up on AI, pricing, and CRM.',
    date: 'April 2026',
    category: 'Comparisons',
    readingTime: '12 min read',
    type: 'comparison',
  },
  {
    slug: 'ai-changing-recruitment-agencies-2026',
    title: 'How AI Is Actually Changing Recruitment Agencies in 2026',
    excerpt: "AI in recruitment has moved beyond hype. Here's what's actually working for agencies in 2026: semantic search, match scoring, and automated candidate summaries.",
    date: 'April 2026',
    category: 'AI in Recruitment',
    readingTime: '8 min read',
    type: 'ai',
  },
]

const categories = ['All', 'Comparisons', 'AI in Recruitment', 'Agency Growth']

// Featured image component for comparison post
function ComparisonFeaturedImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-kinetic-teal to-navy flex items-center justify-between p-6">
      <div className="flex-1">
        <div className="text-white/90 text-sm font-medium mb-2">Comparison Guide</div>
        <h3 className="text-white text-lg md:text-xl font-bold leading-tight">
          Best ATS for<br />Recruitment Agencies
        </h3>
        <div className="text-kinetic-tealLight text-sm mt-2">2026</div>
      </div>
      <div className="hidden md:flex flex-col gap-2">
        <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-white/80 text-xs font-medium">KR</div>
        <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-white/60 text-xs">Bullhorn</div>
        <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-white/60 text-xs">Manatal</div>
        <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-white/60 text-xs">Recruiterflow</div>
      </div>
    </div>
  )
}

// Featured image component for AI post
function AIFeaturedImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-navy to-kinetic-teal flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-kinetic-teal/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white text-lg md:text-xl font-bold leading-tight">
          How AI Is Changing<br />Recruitment in 2026
        </h3>
        <p className="text-kinetic-tealLight text-sm mt-3">What's actually working</p>
      </div>
    </div>
  )
}

export default function BlogListing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Blog & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights on AI-powered recruitment, agency growth, and the future of hiring technology.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === 'All'
                    ? 'bg-kinetic-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Featured Image */}
                <div className="aspect-[16/9] relative">
                  {post.type === 'comparison' ? (
                    <ComparisonFeaturedImage />
                  ) : (
                    <AIFeaturedImage />
                  )}
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs text-kinetic-teal bg-kinetic-teal/10 px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-kinetic-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-kinetic-teal font-medium text-sm group-hover:gap-2 transition-all duration-200">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay up to date with recruitment AI
          </h2>
          <p className="text-gray-400 mb-8">
            Get the latest insights on AI-powered recruiting delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal"
            />
            <button className="bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
}