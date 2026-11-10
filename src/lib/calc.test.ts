import { describe, expect, it } from "vitest";
import { capacity, commercial, innovation } from "./calc";

describe("calculator", () => {
  it("capacity: hours freed and extra concepts", () => {
    const r = capacity({ concepts: 100, traditionalHours: 40, meshyHours: 10, hourlyCost: 75 });
    expect(r.hoursFreed).toBe(3000);
    expect(r.reduction).toBe(0.75);
    expect(r.value).toBe(225000);
    expect(r.extraConcepts).toBe(300);
  });
  it("innovation: annual variations advanced", () => {
    const r = innovation({ designers: 10, conceptsPerMonth: 4, variationsPerConcept: 3, extraVariations: 2, advancePct: 25 });
    expect(r.baselineConcepts).toBe(480);
    expect(r.baselineVariations).toBe(1440);
    expect(r.additionalVariations).toBe(960);
    expect(r.advanced).toBe(240);
  });
  it("commercial: contribution after costs", () => {
    expect(commercial({ launches: 2, revenuePerLaunch: 1000, marginPct: 40, costs: 300 }).net).toBe(500);
  });
});
