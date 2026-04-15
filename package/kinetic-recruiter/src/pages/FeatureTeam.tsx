import { ArrowRight, Check, Users, BarChart3, Plug, Shield, Settings } from 'lucide-react'
import Layout from './Layout'

// Admin dashboard illustration
function AdminDashboardIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
      {/* Browser header */}
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 border border-gray-200">
          app.kineticrecruiter.com/admin
        </div>
      </div>
      {/* Dashboard content */}
      <div className="p-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-kinetic-teal/5 rounded-lg p-3">
            <div className="text-xs text-gray-500">Active Users</div>
            <div className="text-lg font-bold text-navy">12</div>
          </div>
          <div className="bg-kinetic-teal/5 rounded-lg p-3">
            <div className="text-xs text-gray-500">Candidates</div>
            <div className="text-lg font-bold text-navy">847</div>
          </div>
          <div className="bg-kinetic-teal/5 rounded-lg p-3">
            <div className="text-xs text-gray-500">This Month</div>
            <div className="text-lg font-bold text-kinetic-teal">+23</div>
          </div>
        </div>
        {/* Usage bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Usage</span>
            <span className="text-xs text-kinetic-teal">67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-kinetic-teal h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
        {/* Team list */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500">Team Members</div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <div className="w-6 h-6 bg-kinetic-teal rounded-full flex items-center justify-center text-white text-xs">JS</div>
            <div className="flex-1">
              <div className="text-xs font-medium">John Smith</div>
            </div>
            <div className="text-xs text-gray-500">Owner</div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">Sarah Chen</div>
            </div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats dashboard illustration
function StatsDashboardIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Jobs</div>
          <div className="text-xl font-bold text-navy">24</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Candidates</div>
          <div className="text-xl font-bold text-navy">156</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Clients</div>
          <div className="text-xl font-bold text-navy">8</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-3">
          <div className="text-xs text-gray-500">Applications</div>
          <div className="text-xl font-bold text-navy">47</div>
        </div>
      </div>
      {/* Line chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-xs font-medium text-gray-500 mb-3">30-Day Trend</div>
        <div className="h-20 flex items-end gap-2">
          <div className="flex-1 bg-kinetic-teal/20 rounded-t" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-kinetic-teal/30 rounded-t" style={{ height: '60%' }}></div>
          <div className="flex-1 bg-kinetic-teal/40 rounded-t" style={{ height: '50%' }}></div>
          <div className="flex-1 bg-kinetic-teal/50 rounded-t" style={{ height: '70%' }}></div>
          <div className="flex-1 bg-kinetic-teal/60 rounded-t" style={{ height: '80%' }}></div>
          <div className="flex-1 bg-kinetic-teal rounded-t" style={{ height: '100%' }}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Week 1</span>
          <span>Week 4</span>
        </div>
      </div>
    </div>
  )
}

// Multi-tenant security illustration
function MultiTenantIllustration() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-kinetic-teal">
        <div className="w-16 h-16 bg-kinetic-teal/10 rounded-lg flex items-center justify-center mb-2">
          <Shield className="w-8 h-8 text-kinetic-teal" />
        </div>
        <div className="font-medium text-sm text-center">Org A</div>
        <div className="text-xs text-gray-500 text-center">Isolated Data</div>
      </div>
      <div className="bg-gray-200 w-1 h-20"></div>
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
          <Shield className="w-8 h-8 text-gray-400" />
        </div>
        <div className="font-medium text-sm text-center text-gray-400">Org B</div>
        <div className="text-xs text-gray-400 text-center">Isolated Data</div>
      </div>
      <div className="bg-gray-200 w-1 h-20"></div>
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
          <Shield className="w-8 h-8 text-gray-400" />
        </div>
        <div className="font-medium text-sm text-center text-gray-400">Org C</div>
        <div className="text-xs text-gray-400 text-center">Isolated Data</div>
      </div>
    </div>
  )
}

export default function FeatureTeam() {
  const sections = [
    {
      headline: 'Four roles. One organisation. Full control.',
      body: `Owner, Admin, Standard, and Readonly roles give you precise control over who can do what. Invite team members by email or share an open invite code. When someone signs up with a matching email domain, they're automatically routed to your organisation for approval.

Google and Microsoft OAuth sign-in mean one less password for your team.`,
      illustration: <AdminDashboardIllustration />,
    },
    {
      headline: 'The numbers that matter.',
      body: `Real-time counts across jobs, candidates, applications, and clients. Pipeline stage visualisation showing where candidates sit across all active roles. 30-day activity trends. Source breakdown reporting. Recent activity feed. All built in.`,
      illustration: <StatsDashboardIllustration />,
    },
    {
      headline: 'Connect to your stack.',
      body: `RESTful API with key-based authentication for custom integrations. Global search via Command+K palette. Email integration supporting Brevo, Gmail, and SendGrid. Chrome extension for LinkedIn. Inbound webhook for email resume processing.`,
      illustration: (
        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
            <Plug className="w-8 h-8 text-kinetic-teal" />
          </div>
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg border border-kinetic-teal flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-kinetic-teal" />
          </div>
        </div>
      ),
    },
    {
      headline: 'Multi-tenant by design.',
      body: `Every query is scoped to your organisation. Every action is logged. Sessions secured with 7-day TTL cookies. Resume files stored in Google Cloud Storage with signed URLs. API keys validated via hash comparison.`,
      illustration: <MultiTenantIllustration />,
    },
  ]

  return (
    <Layout>
      {/* Hero with gradient and illustration */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                Team & Platform
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Built to run as a product, not a prototype.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Multi-tenant architecture, Stripe billing, role-based access, and platform administration. Commercial-grade SaaS from day one.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-kinetic-teal rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy">Enterprise Security</div>
                    <div className="text-sm text-gray-500">SOC 2 Type II Certified</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
                    <div className="w-8 h-8 bg-kinetic-teal/20 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-kinetic-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">4 Roles</div>
                      <div className="text-xs text-gray-500">Owner, Admin, Standard, Readonly</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
                    <div className="w-8 h-8 bg-kinetic-teal/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-kinetic-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Real-time Analytics</div>
                      <div className="text-xs text-gray-500">Jobs, candidates, pipeline</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
                    <div className="w-8 h-8 bg-kinetic-teal/20 rounded-lg flex items-center justify-center">
                      <Plug className="w-4 h-4 text-kinetic-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">REST API</div>
                      <div className="text-xs text-gray-500">Key-based authentication</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative gradient blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-kinetic-teal/10 rounded-full blur-3xl"></div>
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

      {/* Platform Features */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Team Management', desc: 'Role-based access control' },
              { icon: BarChart3, title: 'Analytics', desc: 'Real-time dashboards' },
              { icon: Plug, title: 'API & Integrations', desc: 'Connect your tools' },
              { icon: Shield, title: 'Security', desc: 'Enterprise-grade protection' },
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
            Ready to scale your team?
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