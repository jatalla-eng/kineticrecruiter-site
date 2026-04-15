import { Sparkles, Edit3, Check, ArrowRight } from 'lucide-react';

export default function FeatureIllustration3() {
  return (
    <div className="relative bg-lightGrey rounded-2xl p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before - Resume */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Original Resume</p>
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-sm">📄</span>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <p className="font-medium text-navy">Sarah Mitchell</p>
                <p className="text-xs text-gray-500">8 years experience</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="font-semibold text-navy mb-2">Work Experience</p>
              <p className="text-gray-600 text-xs">Senior Software Engineer, TechCorp Australia</p>
              <p className="text-gray-400 text-xs">2019 - Present</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Led development of microservices architecture, managed team of 5 engineers,
                implemented CI/CD pipelines reducing deployment time by 60%.
              </p>
            </div>
          </div>
        </div>

        {/* After - AI Highlights */}
        <div className="bg-white rounded-xl shadow-lg shadow-kinetic-teal/10 border-2 border-kinetic-teal/20 p-5 relative">
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-kinetic-teal uppercase tracking-wider">AI Career Highlights</p>
            <div className="flex items-center gap-1 text-xs text-kinetic-teal font-medium">
              <Check className="w-3 h-3" />
              Ready to use
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-kinetic-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
              <span className="text-sm text-gray-700">
                Led microservices architecture migration for a Series B fintech startup
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-kinetic-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
              <span className="text-sm text-gray-700">
                Managed and grew a high-performing team of 5 engineers
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-kinetic-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
              <span className="text-sm text-gray-700">
                Reduced deployment time by 60% through CI/CD pipeline implementation
              </span>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 text-sm text-kinetic-teal border border-kinetic-teal/30 rounded-lg py-2 hover:bg-kinetic-teal/5 transition-colors">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-kinetic-teal text-white rounded-lg py-2 hover:bg-kinetic-tealDark transition-colors">
              Use
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-kinetic-teal/5 rounded-full blur-2xl" />
    </div>
  );
}
