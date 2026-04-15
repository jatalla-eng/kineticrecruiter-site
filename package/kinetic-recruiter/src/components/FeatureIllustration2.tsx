import { MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeatureIllustration2() {
  return (
    <div className="relative bg-lightGrey rounded-2xl p-6 md:p-8">
      {/* Score card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center text-white font-bold text-xl">
                SM
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-kinetic-teal rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-navy">Sarah Mitchell</p>
              <p className="text-sm text-gray-500">Senior Backend Developer</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-kinetic-teal/10 text-kinetic-teal px-2 py-0.5 rounded-full font-medium">Top Candidate</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-kinetic-teal">87</div>
            <p className="text-sm text-gray-500">/100</p>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Skills Match</span>
              <span className="font-semibold text-navy">92%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-kinetic-teal rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Experience</span>
              <span className="font-semibold text-navy">85%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-cyan rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Location</span>
              <span className="font-semibold text-navy">80%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Why this candidate */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-kinetic-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-kinetic-teal" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy mb-1">Why this candidate</p>
              <p className="text-sm text-gray-600">
                Strong Python and AWS experience matches the role requirements. Previous fintech background at two Series B companies. Currently located in Melbourne, open to Sydney relocation.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
          <button className="flex-1 bg-kinetic-teal text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-kinetic-tealDark transition-colors">
            <MessageSquare className="w-4 h-4" />
            Contact
          </button>
          <button className="flex-1 border-2 border-kinetic-teal text-kinetic-teal px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-kinetic-teal hover:text-white transition-colors">
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan/10 rounded-full blur-2xl" />
    </div>
  );
}
