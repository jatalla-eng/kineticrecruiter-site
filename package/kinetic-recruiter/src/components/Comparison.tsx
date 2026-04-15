import { Check, X } from 'lucide-react';

export default function Comparison() {
  const comparison1 = {
    title: "AI That's Actually Included",
    features: [
      { name: 'AI candidate matching', kinetic: true, bullhorn: '$39+/mo add-on', recruiterflow: 'Locked behind AIRA plan' },
      { name: 'AI resume parsing', kinetic: true, bullhorn: 'Add-on', recruiterflow: true },
      { name: 'AI email composition', kinetic: true, bullhorn: false, recruiterflow: 'AIRA plan only' },
      { name: 'AI career highlights', kinetic: true, bullhorn: false, recruiterflow: false },
      { name: 'Natural language search', kinetic: true, bullhorn: false, recruiterflow: false },
      { name: 'Semantic embeddings', kinetic: true, bullhorn: false, recruiterflow: false },
    ],
  };

  const comparison2 = {
    title: 'Built for Agencies, Not Just HR Teams',
    features: [
      { name: 'Client company management', kinetic: 'Built-in', workable: false, greenhouse: false },
      { name: 'Contact directory per client', kinetic: 'Built-in', workable: false, greenhouse: false },
      { name: 'Client submission emails (AI)', kinetic: 'Built-in', workable: false, greenhouse: false },
      { name: 'Company enrichment', kinetic: 'Built-in', workable: false, greenhouse: false },
    ],
  };

  const Cell = ({ value }: { value: boolean | string }) => {
    if (value === true) {
      return (
        <div className="flex justify-center">
          <Check className="w-5 h-5 text-kinetic-teal" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex justify-center">
          <X className="w-5 h-5 text-gray-300" />
        </div>
      );
    }
    return <span className="text-sm text-gray-600 text-center">{value}</span>;
  };

  return (
    <section id="comparison" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            How KineticRecruiter compares where it counts.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We built the AI features other platforms charge extra for. Here's the difference.
          </p>
        </div>

        {/* Comparison Table 1 */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-navy mb-6">{comparison1.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-navy w-1/2">Feature</th>
                  <th className="py-4 px-4 font-semibold text-white text-center bg-kinetic-teal rounded-t-lg w-1/6">
                    KineticRecruiter
                  </th>
                  <th className="py-4 px-4 font-medium text-gray-500 text-center bg-gray-100 w-1/6">Bullhorn</th>
                  <th className="py-4 px-4 font-medium text-gray-500 text-center bg-gray-100 rounded-t-lg w-1/6">Recruiterflow</th>
                </tr>
              </thead>
              <tbody>
                {comparison1.features.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                    <td className="py-4 px-4 text-navy font-medium">{feature.name}</td>
                    <td className="py-4 px-4 bg-kinetic-tealLight/30">
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

        {/* Comparison Table 2 */}
        <div>
          <h3 className="text-xl font-bold text-navy mb-6">{comparison2.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-navy w-1/2">Feature</th>
                  <th className="py-4 px-4 font-semibold text-white text-center bg-kinetic-teal rounded-t-lg w-1/4">
                    KineticRecruiter
                  </th>
                  <th className="py-4 px-4 font-medium text-gray-500 text-center bg-gray-100 w-1/4">Workable</th>
                  <th className="py-4 px-4 font-medium text-gray-500 text-center bg-gray-100 rounded-t-lg w-1/4">Greenhouse</th>
                </tr>
              </thead>
              <tbody>
                {comparison2.features.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                    <td className="py-4 px-4 text-navy font-medium">{feature.name}</td>
                    <td className="py-4 px-4 bg-kinetic-tealLight/30 text-center">
                      <Cell value={feature.kinetic} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Cell value={feature.workable} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Cell value={feature.greenhouse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
