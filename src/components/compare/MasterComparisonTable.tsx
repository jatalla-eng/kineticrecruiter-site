import { Check, X, Minus } from 'lucide-react';
import { comparisonMatrix, MatrixValue } from '@/lib/competitors';

const VENDOR_COLS = [
  { key: 'kinetic' as const, label: 'KineticRecruiter', highlight: true },
  { key: 'greenhouse' as const, label: 'Greenhouse' },
  { key: 'lever' as const, label: 'Lever' },
  { key: 'bullhorn' as const, label: 'Bullhorn' },
  { key: 'jobadder' as const, label: 'JobAdder' },
  { key: 'vincere' as const, label: 'Vincere' },
];

function renderValue(value: MatrixValue, highlight: boolean) {
  if (typeof value === 'string') {
    return <span className={highlight ? 'font-semibold text-kinetic-navy' : 'text-gray-700'}>{value}</span>;
  }
  const { v, note } = value;
  const iconClass = 'w-4 h-4 flex-shrink-0';
  const icon =
    v === 'yes' ? <Check className={`${iconClass} text-kinetic-teal`} /> :
    v === 'no' ? <X className={`${iconClass} text-gray-300`} /> :
    <Minus className={`${iconClass} text-motion-amber`} />;
  return (
    <div className="flex items-start gap-1.5">
      {icon}
      {note && <span className={`text-xs ${highlight ? 'text-kinetic-navy font-medium' : 'text-gray-500'}`}>{note}</span>}
    </div>
  );
}

export default function MasterComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="sticky left-0 bg-gray-50 z-10 py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
              Dimension
            </th>
            {VENDOR_COLS.map((col) => (
              <th
                key={col.key}
                className={`py-4 px-4 text-left text-sm font-bold border-b border-gray-200 ${
                  col.highlight
                    ? 'bg-kinetic-teal-light text-kinetic-teal border-b-kinetic-teal'
                    : 'text-kinetic-navy'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonMatrix.map((row, i) => (
            <tr key={row.dimension} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className={`sticky left-0 z-10 py-4 px-4 font-semibold text-kinetic-navy align-top border-b border-r border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                {row.dimension}
              </td>
              {VENDOR_COLS.map((col) => (
                <td
                  key={col.key}
                  className={`py-4 px-4 align-top border-b border-gray-100 ${
                    col.highlight ? 'bg-kinetic-teal-light/40' : ''
                  }`}
                >
                  {renderValue(row[col.key], col.highlight ?? false)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
