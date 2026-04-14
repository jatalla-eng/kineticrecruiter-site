'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type PlanOption = 'General Inquiry' | 'Starter' | 'Professional' | 'Agency';

const PLAN_OPTIONS: PlanOption[] = ['General Inquiry', 'Starter', 'Professional', 'Agency'];

function normalizePlan(raw: string | null): PlanOption {
  if (!raw) return 'General Inquiry';
  const lower = raw.toLowerCase();
  if (lower === 'starter') return 'Starter';
  if (lower === 'professional') return 'Professional';
  if (lower === 'agency') return 'Agency';
  return 'General Inquiry';
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialPlan = normalizePlan(searchParams.get('plan'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    plan: initialPlan,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`KineticRecruiter Contact - ${formData.plan}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPlan: ${formData.plan}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@kineticrecruiter.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-kinetic-teal/20 bg-kinetic-teal-light p-8 text-center">
        <p className="text-lg font-semibold text-kinetic-teal">
          Thanks! We&apos;ll be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-kinetic-navy mb-1">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-kinetic-teal"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-kinetic-navy mb-1">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="work@example.com"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-kinetic-teal"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-kinetic-navy mb-1">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Company name"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-kinetic-teal"
        />
      </div>

      <div>
        <label htmlFor="plan" className="block text-sm font-medium text-kinetic-navy mb-1">
          Plan interest
        </label>
        <select
          id="plan"
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-kinetic-teal bg-white"
        >
          {PLAN_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-kinetic-navy mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your team and what you're looking for"
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-kinetic-teal resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-kinetic-teal text-white rounded-lg px-8 py-3 font-semibold hover:bg-kinetic-teal-dark w-full transition-colors"
      >
        Send message
      </button>
    </form>
  );
}
