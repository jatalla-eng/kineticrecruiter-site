export default function FeatureIllustration5() {
  const stages = [
    { name: 'Sourcing', candidates: 2, color: 'bg-cyan' },
    { name: 'Screened', candidates: 3, color: 'bg-kinetic-teal' },
    { name: 'Submitted', candidates: 1, color: 'bg-kinetic-teal' },
    { name: 'Interview', candidates: 2, color: 'bg-kinetic-teal' },
    { name: 'Offer', candidates: 1, color: 'bg-amber' },
  ];

  return (
    <div className="relative bg-lightGrey rounded-2xl p-4 md:p-6 overflow-hidden">
      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex-shrink-0 w-36">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${stage.color}`} />
              <span className="text-xs font-semibold text-navy">{stage.name}</span>
              <span className="text-xs text-gray-400">({stage.candidates})</span>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {Array.from({ length: Math.min(stage.candidates, 2) }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                        i === 0 ? 'bg-kinetic-teal' : i === 1 ? 'bg-amber' : 'bg-violet'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy truncate">
                        {['Alex Kim', 'Jordan Lee', 'Taylor Brown', 'Morgan Davis', 'Casey Wilson'][index * 2 + i] || 'Candidate'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3 h-3 ${star <= 4 - i * 0 ? 'text-amber' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-kinetic-teal/5 rounded-full blur-2xl" />
    </div>
  );
}
