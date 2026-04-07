import { Check, X } from 'lucide-react';

const noHiddenCosts = [
  {
    number: '$0',
    label: 'Implementation fee',
    subtext: 'Bullhorn charges $1K–$15K+',
  },
  {
    number: '$0',
    label: 'Training costs',
    subtext: 'Greenhouse charges $2K–$10K',
  },
  {
    number: '$0',
    label: 'AI add-on fees',
    subtext: 'Bullhorn charges $39+/mo per add-on',
  },
];

const comparisonFeatures = [
  { name: 'AI candidate matching', kinetic: true, bullhorn: '$39+/mo add-on', recruiterflow: 'Locked behind AIRA plan' },
  { name: 'AI resume parsing', kinetic: true, bullhorn: 'Add-on', recruiterflow: true },
  { name: 'AI email composition', kinetic: true, bullhorn: false, recruiterflow: 'AIRA plan only' },
  { name: 'AI career highlights', kinetic: true, bullhorn: false, recruiterflow: false },
  { name: 'Natural language search', kinetic: true, bullhorn: false, recruiterflow: false },
  { name: 'Client CRM built in', kinetic: true, bullhorn: false, recruiterflow: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="w-5 h-5 text-[#0d8488]" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="w-5 h-5 text-gray-500" />
      </div>
    );
  }
  return <span className="text-xs text-gray-400 text-center block">{value}</span>;
}

export default function ComparisonStrip() {
  return (
    <section className="bg-[#1a2332]">
      {/* No Hidden Costs strip */}
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How KineticRecruiter compares where it counts.
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We built the AI features other platforms charge extra for. Here&apos;s the difference.
            </p>
          </div>

          {/* $0 cards */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {noHiddenCosts.map((card) => (
              <div
                key={card.label}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#0d8488] mb-2">
                  {card.number}
                </div>
                <div className="text-xl font-semibold text-white mb-2">{card.label}</div>
                <div className="text-gray-400">{card.subtext}</div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">AI That&apos;s Actually Included</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-semibold text-gray-300 w-1/2">Feature</th>
                    <th className="py-4 px-4 font-semibold text-white text-center bg-[#0d8488] rounded-t-lg w-1/6">
                      KineticRecruiter
                    </th>
                    <th className="py-4 px-4 font-medium text-gray-400 text-center bg-white/5 w-1/6">Bullhorn</th>
                    <th className="py-4 px-4 font-medium text-gray-400 text-center bg-white/5 rounded-t-lg w-1/6">
                      Recruiterflow
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}
                    >
                      <td className="py-4 px-4 text-gray-200 font-medium">{feature.name}</td>
                      <td className="py-4 px-4 bg-[#0d8488]/10">
                        <Cell value={feature.kinetic} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Cell value={feature.bullhorn} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Cell value={feature.recruiterflow} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
