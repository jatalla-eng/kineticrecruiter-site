export default function FeatureIllustration1() {
  return (
    <div className="relative bg-lightGrey rounded-2xl p-6 md:p-8">
      {/* Search bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-gray-400 text-sm">
            Find backend developers with fintech experience in Sydney
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {/* Result 1 - High match */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-kinetic-teal/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-kinetic-teal flex items-center justify-center text-white font-semibold">
                SM
              </div>
              <div>
                <p className="font-semibold text-navy">Sarah Mitchell</p>
                <p className="text-sm text-gray-500">Senior Backend Developer • 8 yrs exp</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-kinetic-teal/10 text-kinetic-teal px-3 py-1 rounded-full text-sm font-semibold">
                94%
              </div>
              <p className="text-xs text-gray-400 mt-1">match</p>
            </div>
          </div>
        </div>

        {/* Result 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <p className="font-semibold text-navy">James Davidson</p>
                <p className="text-sm text-gray-500">Full Stack Developer • 5 yrs exp</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                82%
              </div>
              <p className="text-xs text-gray-400 mt-1">match</p>
            </div>
          </div>
        </div>

        {/* Result 3 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet flex items-center justify-center text-white font-semibold">
                LC
              </div>
              <div>
                <p className="font-semibold text-navy">Lisa Chen</p>
                <p className="text-sm text-gray-500">Backend Engineer • 6 yrs exp</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                78%
              </div>
              <p className="text-xs text-gray-400 mt-1">match</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-kinetic-teal/5 rounded-full blur-2xl" />
    </div>
  );
}
