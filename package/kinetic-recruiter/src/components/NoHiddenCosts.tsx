export default function NoHiddenCosts() {
  const cards = [
    {
      number: '$0',
      label: 'Implementation fee',
      subtext: 'Bullhorn charges $1K-$15K+',
    },
    {
      number: '$0',
      label: 'Training costs',
      subtext: 'Greenhouse charges $2K-$10K',
    },
    {
      number: '$0',
      label: 'AI add-on fees',
      subtext: 'Bullhorn charges $39+/mo per add-on',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-5xl md:text-6xl font-bold text-kinetic-teal mb-2">
                {card.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {card.label}
              </div>
              <div className="text-gray-400">{card.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
