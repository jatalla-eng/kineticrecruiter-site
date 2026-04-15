import { ArrowRight, Check, Building, LayoutGrid, Mail, TrendingUp, CircleUser } from 'lucide-react'
import Layout from './Layout'

// Five-node flow illustration
function FiveNodeFlowIllustration() {
  const nodes = ['Client', 'Job', 'Shortlist', 'Submit', 'Placed']
  return (
    <div className="flex items-center justify-between gap-2">
      {nodes.map((node, index) => (
        <div key={node} className="flex items-center">
          <div className="bg-kinetic-teal text-white px-4 py-3 rounded-xl font-medium text-sm shadow-lg">
            {node}
          </div>
          {index < nodes.length - 1 && (
            <div className="w-8 h-0.5 bg-kinetic-teal/30 mx-1"></div>
          )}
        </div>
      ))}
    </div>
  )
}

// Client CRM illustration
function ClientCRMIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      {/* Company card */}
      <div className="bg-kinetic-teal/5 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-kinetic-teal/20 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-kinetic-teal" />
          </div>
          <div>
            <div className="font-semibold">TechVentures Pty Ltd</div>
            <div className="text-xs text-gray-500">Technology • Sydney, NSW</div>
          </div>
        </div>
        <div className="text-sm text-gray-600">3 active jobs • 12 candidates</div>
      </div>
      {/* Contacts */}
      <div className="space-y-2 mb-4">
        <div className="text-xs font-medium text-gray-500 uppercase">Contacts</div>
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="font-medium text-sm">Jane Smith</div>
            <div className="text-xs text-gray-500">Head of Engineering</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="font-medium text-sm">Mark Chen</div>
            <div className="text-xs text-gray-500">HR Manager</div>
          </div>
        </div>
      </div>
      {/* Jobs */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-500 uppercase">Linked Jobs</div>
        <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-kinetic-teal">
          <div className="font-medium text-sm">Senior React Developer</div>
          <div className="text-xs text-kinetic-teal">5 candidates • 2 submitted</div>
        </div>
      </div>
    </div>
  )
}

// Mini Kanban board illustration
function MiniKanbanIllustration() {
  const columns = ['Sourcing', 'Screened', 'Submitted']
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-sm">Senior React Developer</div>
        <div className="text-xs text-gray-500">TechVentures</div>
      </div>
      {/* Kanban columns */}
      <div className="flex gap-2">
        {columns.map((col) => (
          <div key={col} className="flex-1 bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-2 font-medium">{col}</div>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal text-xs font-medium">SL</div>
                  <div className="text-xs font-medium">Sarah L.</div>
                  <div className="ml-auto bg-kinetic-teal text-white text-xs px-1 rounded">87</div>
                </div>
              </div>
              <div className="bg-white rounded p-2 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal text-xs font-medium">JM</div>
                  <div className="text-xs font-medium">James M.</div>
                  <div className="ml-auto bg-kinetic-teal text-white text-xs px-1 rounded">92</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Drag hint */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-400 italic">Drag candidates between stages</div>
      </div>
    </div>
  )
}

// Dashboard illustration
function DashboardIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Total Jobs</div>
          <div className="text-xl font-bold text-navy">24</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Active Candidates</div>
          <div className="text-xl font-bold text-navy">156</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Placements</div>
          <div className="text-xl font-bold text-kinetic-teal">8</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">This Month</div>
          <div className="text-xl font-bold text-navy">3</div>
        </div>
      </div>
      {/* Chart placeholder */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-xs font-medium text-gray-500 mb-3">Pipeline Trend</div>
        <div className="flex items-end gap-2 h-16">
          <div className="flex-1 bg-kinetic-teal/20 rounded-t h-8"></div>
          <div className="flex-1 bg-kinetic-teal/30 rounded-t h-12"></div>
          <div className="flex-1 bg-kinetic-teal/40 rounded-t h-10"></div>
          <div className="flex-1 bg-kinetic-teal/60 rounded-t h-14"></div>
          <div className="flex-1 bg-kinetic-teal rounded-t h-16"></div>
        </div>
      </div>
    </div>
  )
}

export default function FeatureAgency() {
  const sections = [
    {
      headline: 'Every client. Every contact. Every role. Linked.',
      body: `Create client company profiles with industry, website, logo, and contact details. Add contacts with titles, email, phone, LinkedIn, and reporting structure. Assign jobs to clients and link hiring managers. Enrich company profiles automatically from their website.

Clients are a core entity in KineticRecruiter. Every job belongs to a client. Every submission is tracked against a client. Your entire book of business lives alongside your candidate data.`,
      illustration: <ClientCRMIllustration />,
    },
    {
      headline: 'Seven stages. Complete visibility.',
      body: `Every job has a visual shortlist board: Sourcing, Screened, Client Submitted, Interviewed, Offer, Placed, Closed. Drag candidates between stages. Track outcomes for closed candidates (hired, rejected, withdrawn). Star ratings (1-5) and suitability scores (0-100) let you compare candidates within a stage.

Add candidates from your existing database, from AI-suggested matches, or from new applications.`,
      illustration: <MiniKanbanIllustration />,
    },
    {
      headline: 'Draft, review, send. Under 30 seconds.',
      body: `Select a candidate on your shortlist, click "Submit to Client", and KineticRecruiter drafts a professional email. The AI uses your organisation's custom prompt settings to match your team's tone and structure. A candidate summary is auto-generated and included. Review, tweak if needed, and send via your default email client.`,
      illustration: (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Recruiter reviewing candidates on screen"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
        </div>
      ),
    },
    {
      headline: 'From first contact to placement. Tracked.',
      body: `Dashboard metrics show your pipeline health across all clients and roles. Total jobs, active jobs, candidates in pipeline, and placement rate at a glance. 30-day trends track new candidates, applications, and hires over time. Source breakdown reporting shows which channels deliver results.`,
      illustration: <DashboardIllustration />,
    },
  ]

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <LayoutGrid className="w-4 h-4" />
                Agency Workflow
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Clients, candidates, and submissions. One system.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                KineticRecruiter is built for recruitment agencies who manage multiple clients, not HR teams hiring into one company.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div>
              <FiveNodeFlowIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Sections with illustrations */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-lightGrey'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  {section.headline}
                </h2>
                {section.body.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                {section.illustration}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Workflow Features */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Building, title: 'Client CRM', desc: 'Manage all client relationships' },
              { icon: LayoutGrid, title: 'Job Shortlist', desc: 'Visual pipeline management' },
              { icon: Mail, title: 'AI Submissions', desc: 'Generate emails instantly' },
              { icon: TrendingUp, title: 'Analytics', desc: 'Track pipeline performance' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-kinetic-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-kinetic-tealLight via-white to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Ready to streamline your agency workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every feature.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </Layout>
  )
}