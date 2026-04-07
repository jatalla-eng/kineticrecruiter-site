import plansData from './plans.json';

export const plans = plansData.plans;
export const trial = plansData.trial;
export const referral = plansData.referral;

export type PlanKey = keyof typeof plans;

export function getPlan(key: PlanKey) {
  return plans[key];
}

export function getAllPlans() {
  return Object.entries(plans)
    .sort(([, a], [, b]) => a.sort_order - b.sort_order)
    .map(([key, plan]) => ({ key, ...plan }));
}
