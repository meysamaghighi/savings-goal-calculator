import type { MetadataRoute } from "next";
import { savingsGoals } from "./lib/savings-engine";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://savings-goal-calculator.vercel.app";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...savingsGoals.map((g) => ({
      url: `${base}/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
