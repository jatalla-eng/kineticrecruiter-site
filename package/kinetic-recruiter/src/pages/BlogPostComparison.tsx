import Layout from './Layout'

export default function BlogPostComparison() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Best ATS for Recruitment Agencies in 2026: An Honest Comparison',
    description: 'Compare the top ATS platforms for recruitment agencies in 2026. See how KineticRecruiter, Bullhorn, Manatal, and Recruiterflow stack up on AI, pricing, and CRM.',
    author: {
      '@type': 'Organization',
      name: 'KineticRecruiter Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KineticRecruiter',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kineticrecruiter.com/logo.png',
      },
    },
    datePublished: '2026-04-01',
    dateModified: '2026-04-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://kineticrecruiter.com/blog/best-ats-for-recruitment-agencies-2026',
    },
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-gray-500">
              <li><a href="/" className="hover:text-kinetic-teal">Home</a></li>
              <li>/</li>
              <li><a href="/blog" className="hover:text-kinetic-teal">Blog</a></li>
              <li>/</li>
              <li className="text-gray-900">Best ATS for Recruitment Agencies 2026</li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
            <span>April 2026</span>
            <span>•</span>
            <span>Comparisons</span>
            <span>•</span>
            <span>12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
            The Best ATS for Recruitment Agencies in 2026: An Honest Comparison
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">
              K
            </div>
            <div>
              <div className="font-medium text-navy">KineticRecruiter Team</div>
              <div className="text-sm text-gray-500">Content Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="aspect-[16/9] bg-gradient-to-br from-kinetic-teal to-navy rounded-2xl flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Best ATS for Recruitment Agencies</h2>
            <p className="text-kinetic-tealLight">2026 Comparison Guide</p>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <article className="prose prose-lg max-w-none">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you run a recruitment agency, your ATS is the backbone of your business. It holds your candidates, manages your client relationships, and determines how fast you can submit quality profiles. The wrong one slows you down. The right one makes you faster than your competitors.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The ATS market has shifted significantly over the past two years. AI capabilities have moved from nice-to-have to essential. Pricing models have fragmented. Some platforms now charge separately for features that were previously included, while others have bundled everything into a single per-user fee.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reviewed the most widely used ATS platforms for recruitment agencies in the APAC and global markets. This comparison focuses on what matters most to agency recruiters: AI matching, client CRM, resume processing, pricing transparency, and the speed from sourcing to client submission.
            </p>
          </div>

          {/* What We Compared */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-4">What We Compared</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We evaluated each platform across six categories:</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li><strong>AI and matching capabilities</strong> — Does the platform offer AI-powered candidate matching? Is it included in the base price or an add-on? Can you search in natural language or are you limited to Boolean? Does it explain why a candidate matched?</li>
              <li><strong>Client relationship management</strong> — Does the platform treat clients as first-class entities with contacts, jobs linked to clients, and submission tracking? Or is it designed for in-house HR teams with no client concept?</li>
              <li><strong>Resume processing</strong> — How many intake channels exist? Does it parse resumes with AI? What happens when the AI is unavailable? Does it deduplicate?</li>
              <li><strong>Pricing and total cost</strong> — What does it actually cost when you add up the base price, add-ons, implementation fees, and training costs?</li>
              <li><strong>Reporting and analytics</strong> — Can you track time-to-submit, source effectiveness, and pipeline health? Is reporting built in or an add-on?</li>
              <li><strong>Ease of setup</strong> — How long does it take to go from signup to productive use? Is there an implementation project? Training required?</li>
            </ul>
          </div>

          {/* Platform Overviews */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Platform Overviews</h2>

            {/* KineticRecruiter */}
            <div className="mb-8 p-6 bg-kinetic-teal/5 rounded-xl border border-kinetic-teal/20">
              <h3 className="text-xl font-bold text-navy mb-3">KineticRecruiter</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                KineticRecruiter is an AI-native ATS built specifically for recruitment agencies. Its core differentiator is the depth of AI integration: natural language candidate search using semantic embeddings, match scoring with full factor breakdowns and written explanations, and AI-generated career highlights for client submissions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Client management is built in as a core entity, not an afterthought. Jobs link to clients, contacts sit under client profiles, and the AI generates client submission emails with auto-generated candidate summaries.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pricing starts at $29 per user per month with all AI features included. There are no add-on fees for automation, LinkedIn integration, or analytics. The Professional plan at $59 per user includes unlimited jobs and clients with 1,000 candidate capacity. The Agency plan at $99 per user removes all limits and adds custom reporting, SSO, and dedicated onboarding.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Resume processing supports three intake channels: direct upload, bulk drag-and-drop upload, and inbound email forwarding. A regex fallback parser operates when the primary AI parser is unavailable.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Strongest for:</strong> AI-powered candidate matching with explainability, agency client workflow, and pricing transparency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Gaps to be aware of:</strong> Newer platform with a smaller integration ecosystem. Job board posting and interview scheduling are in active development. No native mobile app yet.
              </p>
            </div>

            {/* Bullhorn */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold text-navy mb-3">Bullhorn</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bullhorn is the largest ATS and CRM platform in the staffing industry, serving over 10,000 agencies globally. It offers a comprehensive feature set covering the full recruitment lifecycle from sourcing through to placement and back-office operations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The platform is powerful but complex. Pricing starts at $99 per user per month for the standard plan, but essential features like LinkedIn integration, email automation, and analytics are separate add-ons at $39 or more per month each. Implementation costs range from $1,000 to $15,000 depending on the size of the deployment, and training can add another $500 to $5,000.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                AI capabilities are available through the Bullhorn Amplify product, which is positioned as a separate add-on. Core search relies on Boolean and keyword matching. The analytics suite (Bullhorn Canvas, acquired from Cube19) is well-regarded but adds to the total cost.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Strongest for:</strong> Large agencies that need extensive customisation, VMS integrations, and a mature marketplace of over 300 partner integrations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Gaps to be aware of:</strong> The add-on pricing model means the actual cost is significantly higher than the advertised starting price. Users frequently report the interface feels dated. AI is not built into the core product.
              </p>
            </div>

            {/* Manatal */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold text-navy mb-3">Manatal</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manatal is a cloud-based ATS that has gained significant traction by offering AI-powered features at a low entry price. Starting at $15 per user per month, it provides resume parsing, AI candidate scoring, social media enrichment, and integration with over 2,500 job boards.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The platform is well-designed and quick to implement. Client CRM is included for agency users. The AI scoring provides candidate recommendations, though the match explanations are less detailed than some competitors.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The main limitations appear at the lower tiers: the starter plan caps at 15 open jobs and 10,000 candidates. API access requires the Enterprise Plus plan at $55 per user. Custom reporting is also gated behind higher tiers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Strongest for:</strong> Small to mid-sized agencies wanting AI features at the lowest possible price point, and teams that post to many job boards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Gaps to be aware of:</strong> AI scoring provides less transparency than platforms that show full factor breakdowns. Customisation options are limited compared to Bullhorn. Some users report the search functionality could be stronger.
              </p>
            </div>

            {/* Recruiterflow */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold text-navy mb-3">Recruiterflow</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Recruiterflow is designed specifically for staffing and recruiting agencies, combining ATS and CRM in a single platform. The interface is clean and user-friendly, with strong email sequence capabilities and workflow automation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pricing starts at $119 per user per month for the Platform plan. AI features are available through AIRA (Recruiterflow's AI agent suite), which requires the higher-tier AIRA plan. The platform includes a Chrome extension for LinkedIn sourcing and integrates with Gmail and Office 365.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Recruiterflow is frequently praised for its user experience and customer support. The "Recipes" automation feature allows agencies to set up triggered workflows. However, AI candidate matching is still under active development and is not yet at feature parity with platforms that have invested more heavily in this area.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Strongest for:</strong> Mid-sized agencies that value user experience, email automation, and a Bullhorn alternative at a lower price point.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Gaps to be aware of:</strong> AI matching capabilities are less mature. The starting price of $119 per user is higher than several competitors that include more AI out of the box. No free trial without contacting sales (though a 14-day trial is available after signup).
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="mb-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Side-by-Side Comparison</h2>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Category</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm bg-kinetic-teal">KineticRecruiter</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Bullhorn</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Manatal</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Recruiterflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Starting price</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 font-semibold text-kinetic-teal text-sm">$29/user/mo</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">$99/user/mo</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">$15/user/mo</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">$119/user/mo</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">AI matching</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">Included, all plans</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Add-on ($39+/mo)</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Included</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">AIRA plan only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Match explainability</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">Full factor breakdown</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Basic score only</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">AI career highlights</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">✓</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Natural language search</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">✓ Semantic</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">— Boolean only</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Keyword + AI</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">— Boolean only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Client CRM</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">Built-in</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Built-in</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Built-in</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Built-in</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">AI submission emails</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">✓</td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">—</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Available</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">AIRA plan only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Resume parsing</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">AI + regex fallback</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Add-on</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">AI included</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">AI included</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Implementation fee</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">$0</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">$1K-$15K+</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">$0</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">Paid migration</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-navy text-sm">Free trial</td>
                  <td className="px-4 py-3 text-center bg-kinetic-teal/10 text-sm">7 days</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">None</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">14 days</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">14 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Comparison */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Pricing Comparison for a 5-Person Agency (Annual)</h2>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Platform</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Base cost</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">AI/automation add-ons</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Implementation</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">Year 1 total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-kinetic-teal">KineticRecruiter (Professional)</td>
                  <td className="px-4 py-3 text-center text-gray-600">$2,940/yr</td>
                  <td className="px-4 py-3 text-center text-kinetic-teal font-medium">$0</td>
                  <td className="px-4 py-3 text-center text-kinetic-teal font-medium">$0</td>
                  <td className="px-4 py-3 text-center font-bold text-kinetic-teal">$2,940</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-600">Manatal (Enterprise)</td>
                  <td className="px-4 py-3 text-center text-gray-600">$2,100/yr</td>
                  <td className="px-4 py-3 text-center text-gray-600">$0</td>
                  <td className="px-4 py-3 text-center text-gray-600">$0</td>
                  <td className="px-4 py-3 text-center font-medium text-gray-600">$2,100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-600">Recruiterflow (Platform)</td>
                  <td className="px-4 py-3 text-center text-gray-600">$7,140/yr</td>
                  <td className="px-4 py-3 text-center text-gray-600">AIRA plan extra</td>
                  <td className="px-4 py-3 text-center text-gray-600">Migration fee</td>
                  <td className="px-4 py-3 text-center font-medium text-gray-600">$8,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-600">Bullhorn (Standard)</td>
                  <td className="px-4 py-3 text-center text-gray-600">$5,940/yr</td>
                  <td className="px-4 py-3 text-center text-gray-600">$2,340/yr (est.)</td>
                  <td className="px-4 py-3 text-center text-gray-600">$5,000+</td>
                  <td className="px-4 py-3 text-center font-medium text-gray-600">$13,000+</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Who Should Choose What */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Who Should Choose What</h2>
            <div className="space-y-4">
              <div className="p-4 bg-kinetic-teal/5 rounded-lg border-l-4 border-kinetic-teal">
                <p className="text-gray-600">
                  <strong className="text-navy">Choose KineticRecruiter if</strong> you want the deepest AI matching capabilities with full transparency, you serve clients and need built-in CRM, and you don't want to worry about add-on fees. Best for agencies that value candidate intelligence and fast client submissions.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-gray-600">
                  <strong className="text-navy">Choose Bullhorn if</strong> you're a large agency (50+ recruiters) that needs extensive customisation, VMS integrations, and a mature partner ecosystem. Be prepared for a higher total cost and longer implementation.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-gray-600">
                  <strong className="text-navy">Choose Manatal if</strong> budget is the primary concern and you need broad job board coverage. The AI is solid at the price point, though less transparent in its scoring methodology.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-gray-600">
                  <strong className="text-navy">Choose Recruiterflow if</strong> you value user experience and email automation above AI matching depth, and you want a Bullhorn alternative at a lower price point.
                </p>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-12 p-6 bg-lightGrey rounded-xl">
            <h2 className="text-xl font-bold text-navy mb-4">Methodology</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This comparison is based on publicly available pricing from each vendor's website and third-party review sites, feature documentation from each platform, and user reviews on G2, Capterra, and GetApp as of early 2026. Pricing may vary based on contract terms and negotiation. We recommend requesting direct quotes from each vendor for your specific requirements.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <em>KineticRecruiter is our product. We've aimed to be fair and accurate about all platforms, including acknowledging our own gaps. If you spot any inaccuracies, contact us at support@kineticrecruiter.com.</em>
            </p>
          </div>

        </article>
      </section>

      {/* Author Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-kinetic-teal rounded-full flex items-center justify-center text-white text-xl font-bold">
            K
          </div>
          <div>
            <div className="font-semibold text-navy">KineticRecruiter Team</div>
            <div className="text-sm text-gray-500">Content Team • April 2026</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-kinetic-tealLight via-white to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Ready to try AI-powered recruitment?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every AI feature.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
          >
            Start Free Trial
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  )
}