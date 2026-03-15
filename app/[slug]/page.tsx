import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SavingsCalculator from "../components/SavingsCalculator";
import {
  savingsGoals,
  getGoalBySlug,
  formatCurrency,
} from "../lib/savings-engine";

export function generateStaticParams() {
  return savingsGoals.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) return {};
  return {
    title: goal.seoTitle,
    description: goal.seoDescription,
  };
}

export default async function GoalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) notFound();

  const otherGoals = savingsGoals.filter((g) => g.slug !== slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
        <Link
          href="/"
          className="text-emerald-600 hover:underline text-sm mb-4 inline-block"
        >
          &larr; All Savings Goals
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          {goal.name}{" "}
          <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">{goal.description}</p>
      </div>

      {/* Calculator with preset */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <SavingsCalculator preset={goal} />
      </div>

      {/* Tips */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {goal.name} Tips
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ul className="space-y-3">
            {goal.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-emerald-500 font-bold shrink-0">
                  {i + 1}.
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick stats */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-xs text-gray-500">Typical Goal</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(goal.goalAmount)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-xs text-gray-500">Suggested Monthly</p>
            <p className="text-xl font-bold text-emerald-600">
              {formatCurrency(goal.monthlySuggestion)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-xs text-gray-500">At 5% Return</p>
            <p className="text-xl font-bold text-purple-600">
              {Math.ceil(
                Math.log(goal.goalAmount / goal.monthlySuggestion) /
                  Math.log(1 + 0.05 / 12)
              ) || "N/A"}{" "}
              months
            </p>
          </div>
        </div>
      </section>

      {/* Other goals */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Other Savings Goals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {otherGoals.map((g) => (
            <Link
              key={g.slug}
              href={`/${g.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 text-center"
            >
              <p className="font-bold text-gray-900 text-sm">{g.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                Goal: ${g.goalAmount.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: goal.seoTitle,
            description: goal.seoDescription,
            url: `https://savings-goal-calculator.vercel.app/${goal.slug}`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}
