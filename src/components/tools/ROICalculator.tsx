'use client';

import { useState, useMemo } from 'react';
import { getAllPlans } from '@/lib/plans';

interface Inputs {
  teamSize: number;
  placementsPerMonth: number;
  timeToFillDays: number;
  feePerPlacement: number;
}

export default function ROICalculator() {
  const proFee = getAllPlans().find((p) => p.key === 'professional')?.monthly_price_cents ?? 5900;

  const [inputs, setInputs] = useState<Inputs>({
    teamSize: 2,
    placementsPerMonth: 5,
    timeToFillDays: 30,
    feePerPlacement: 5000,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    setInputs((prev) => ({ ...prev, [e.target.name]: isNaN(value) ? 0 : value }));
  }

  const results = useMemo(() => {
    const hourlyRate = 50;
    const adminHoursPerPlacement = 4;
    const timeFillReductionDays = inputs.timeToFillDays * 0.30;
    const adminHoursSaved =
      inputs.placementsPerMonth * adminHoursPerPlacement * 0.40 * inputs.teamSize;
    const timeFillHoursSaved =
      inputs.timeToFillDays > 0
        ? (timeFillReductionDays / inputs.timeToFillDays) *
          inputs.placementsPerMonth *
          8 *
          inputs.teamSize
        : 0;
    const totalHoursSavedPerMonth = adminHoursSaved + timeFillHoursSaved;
    const annualCostReduction = totalHoursSavedPerMonth * hourlyRate * 12;
    const monthlyCost = proFee / 100;
    const paybackMonths =
      annualCostReduction > 0 ? (monthlyCost * 12) / annualCostReduction * 12 : 0;
    const annualROI =
      annualCostReduction > 0
        ? ((annualCostReduction - monthlyCost * 12) / (monthlyCost * 12)) * 100
        : 0;

    return {
      totalHoursSavedPerMonth: Math.round(totalHoursSavedPerMonth),
      annualCostReduction: Math.round(annualCostReduction),
      paybackMonths: parseFloat(paybackMonths.toFixed(1)),
      annualROI: Math.round(annualROI),
    };
  }, [inputs, proFee]);

  const inputFields = [
    {
      id: 'teamSize',
      label: 'Number of Recruiters',
      min: 1,
      value: inputs.teamSize,
    },
    {
      id: 'placementsPerMonth',
      label: 'Placements per Month',
      min: 0,
      value: inputs.placementsPerMonth,
    },
    {
      id: 'timeToFillDays',
      label: 'Average Time to Fill (days)',
      min: 1,
      value: inputs.timeToFillDays,
    },
    {
      id: 'feePerPlacement',
      label: 'Fee per Placement ($)',
      min: 0,
      value: inputs.feePerPlacement,
    },
  ];

  const inputClass =
    'mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent';

  return (
    <div className="mx-auto max-w-4xl">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10">
        {inputFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="number"
              min={field.min}
              value={field.value}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ResultCard
          label="Time saved / month (hours)"
          value={results.totalHoursSavedPerMonth.toString()}
          suffix="hrs"
        />
        <ResultCard
          label="Annual cost reduction"
          value={`$${results.annualCostReduction.toLocaleString()}`}
        />
        <ResultCard
          label="Payback period (months)"
          value={results.paybackMonths.toString()}
          suffix="mo"
        />
        <ResultCard
          label="Annual ROI (%)"
          value={`${results.annualROI}%`}
        />
      </div>

      <p className="mt-6 text-xs text-gray-500 text-center">
        Estimates based on {inputs.teamSize} recruiter{inputs.teamSize !== 1 ? 's' : ''} at $50/hr average cost. Results are indicative — actual savings will vary.
      </p>
    </div>
  );
}

function ResultCard({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-xl bg-kinetic-teal-light p-6 text-center">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-kinetic-teal">
        {value}
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
