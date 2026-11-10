export interface CapacityInput {
  concepts: number;
  traditionalHours: number;
  meshyHours: number;
  hourlyCost: number;
}
export function capacity({ concepts, traditionalHours, meshyHours, hourlyCost }: CapacityInput) {
  const saved = Math.max(0, traditionalHours - meshyHours);
  const hoursFreed = concepts * saved;
  const reduction = traditionalHours > 0 ? saved / traditionalHours : 0;
  const value = hoursFreed * hourlyCost;
  const extraConcepts = meshyHours > 0 ? Math.floor(hoursFreed / meshyHours) : 0;
  return { hoursFreed, reduction, value, extraConcepts };
}

export interface InnovationInput {
  designers: number;
  conceptsPerMonth: number;
  variationsPerConcept: number;
  extraVariations: number;
  advancePct: number;
}
export function innovation(i: InnovationInput) {
  const baselineConcepts = i.designers * i.conceptsPerMonth * 12;
  const baselineVariations = baselineConcepts * i.variationsPerConcept;
  const additionalVariations = baselineConcepts * i.extraVariations;
  const advanced = Math.round(additionalVariations * (i.advancePct / 100));
  return { baselineConcepts, baselineVariations, additionalVariations, advanced };
}

export interface CommercialInput {
  launches: number;
  revenuePerLaunch: number;
  marginPct: number;
  costs: number;
}
export function commercial(c: CommercialInput) {
  const revenue = c.launches * c.revenuePerLaunch;
  const contribution = revenue * (c.marginPct / 100);
  return { revenue, contribution, net: contribution - c.costs };
}
