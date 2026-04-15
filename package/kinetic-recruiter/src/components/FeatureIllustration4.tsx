import { Building2, Mail, Briefcase, Plus, Send, Users, Phone } from 'lucide-react';

export default function FeatureIllustration4() {
  return (
    <div className="relative bg-lightGrey rounded-2xl p-6 md:p-8">
      {/* Client Company Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-navy">FinTech Solutions Pty Ltd</p>
            <p className="text-sm text-kinetic-teal">fintechsolutions.com.au</p>
          </div>
          <span className="bg-kinetic-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Contacts */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contacts</p>
            <button className="text-xs text-kinetic-teal flex items-center gap-1 font-medium hover:underline">
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-kinetic-teal/5 border border-kinetic-teal/10">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center text-white font-bold text-sm">
                MT
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-kinetic-teal rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-[8px]">👤</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">Michael Torres</p>
              <p className="text-xs text-gray-500">Head of Engineering</p>
            </div>
            <button className="w-9 h-9 rounded-lg bg-kinetic-teal flex items-center justify-center hover:bg-kinetic-tealDark transition-colors">
              <Mail className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-lightGrey transition-colors">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber to-kinetic-teal flex items-center justify-center text-white font-bold text-sm">
              SJ
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">Sarah Johnson</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
            <button className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-kinetic-teal hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Jobs</p>
            <button className="text-xs text-kinetic-teal flex items-center gap-1 font-medium hover:underline">
              <Plus className="w-3 h-3" />
              New Job
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-kinetic-teal rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Senior Backend Developer</p>
                <p className="text-xs text-kinetic-tealLight flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  3 candidates submitted
                </p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-kinetic-tealLight transition-colors">
              <Send className="w-4 h-4 text-kinetic-teal" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber/10 rounded-full blur-2xl" />
    </div>
  );
}
