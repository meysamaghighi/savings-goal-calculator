import type { Metadata } from "next";
import Link from "next/link";
import SavingsCalculator from "./components/SavingsCalculator";
import { savingsGoals } from "./lib/savings-engine";

export const metadata: Metadata = {
  title:
    "Savings Goal Calculator - How Long to Reach Your Goal? | Free 2026",
  description:
    "Free savings goal calculator with compound interest. See how long to save for an emergency fund, house, vacation, car, wedding, college, or retirement. Track progress and get tips.",
  keywords: [
    "savings goal calculator",
    "savings calculator",
    "how long to save",
    "compound interest calculator",
    "emergency fund calculator",
    "down payment calculator",
    "vacation savings calculator",
    "savings plan",
    "monthly savings calculator",
    "goal tracker",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          How Long Until You Reach Your{" "}
          <span className="text-emerald-600">Savings Goal?</span>
        </h1>
        <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
          Enter your goal, monthly savings, and interest rate. See exactly when
          you will reach it and how much interest you will earn along the way.
        </p>
        <p className="text-sm text-gray-400">
          Free calculator with compound interest and deadline planning
        </p>
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <SavingsCalculator />
      </div>

      {/* Goal Types */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Savings Goals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {savingsGoals.map((g) => (
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

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How Savings Growth Works
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-emerald-600 mb-3">
              Compound Interest
            </h3>
            <p className="text-gray-700 text-sm">
              When you earn interest on your savings, that interest gets added to
              your balance. Next month, you earn interest on the new, larger
              balance. Over time this snowball effect can add thousands to your
              savings, even if your monthly contribution stays the same.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-emerald-600 mb-3">
              Consistency Beats Amount
            </h3>
            <p className="text-gray-700 text-sm">
              Saving $200 every month for 5 years beats saving $5,000 once and
              forgetting about it. Automating your savings on payday ensures you
              pay yourself first. Even small consistent amounts grow
              significantly with compound interest over time.
            </p>
          </div>
        </div>
      </section>

      {/* Savings Tips */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Savings Tips for 2026
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <TipCard
            title="High-Yield Savings"
            desc="Online banks offer 4-5% APY on savings accounts in 2026. That is 10-50x more than traditional banks. Move your savings to earn more."
          />
          <TipCard
            title="Automate Transfers"
            desc="Set up automatic transfers on payday. If the money moves before you see it, you will not miss it. Most banks allow recurring transfers."
          />
          <TipCard
            title="The 50/30/20 Rule"
            desc="Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt payoff. Adjust ratios based on your goals and timeline."
          />
          <TipCard
            title="Separate Accounts"
            desc="Open a dedicated savings account for each goal. Seeing progress toward a specific goal is more motivating than one big pot of money."
          />
          <TipCard
            title="Cut Subscriptions"
            desc="Audit your subscriptions quarterly. The average American spends $273/month on subscriptions. Cutting even a few frees up savings."
          />
          <TipCard
            title="Save Windfalls"
            desc="Tax refunds, bonuses, and gifts can supercharge your savings. Commit to saving at least 50% of any unexpected money."
          />
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Savings Goal Calculator
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            This free savings goal calculator helps you plan any financial goal,
            from a $1,000 emergency fund to a $1,000,000 retirement nest egg.
            Enter your target amount, how much you can save each month, and
            your expected annual return rate to see exactly how long it will
            take to reach your goal.
          </p>
          <p>
            The calculator uses monthly compound interest to project your
            savings growth. If you keep your money in a high-yield savings
            account earning 4-5% APY, the interest earned can shave months or
            even years off your timeline compared to a 0% return.
          </p>
          <p>
            You can also set a deadline to see how much you need to save
            monthly to hit your goal by a specific date. This is useful for
            goals with a known timeline, like saving for a vacation in 12
            months or a wedding in 2 years.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-6">
            Where to Keep Your Savings
          </h3>
          <p>
            For short-term goals (under 3 years), keep your money in a
            high-yield savings account or money market account. These offer
            FDIC insurance and easy access. For longer-term goals, consider
            CDs, I-Bonds, or a conservative investment portfolio. The right
            choice depends on when you need the money and your risk tolerance.
          </p>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much should I save each month?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A common guideline is the 50/30/20 rule: save 20% of your after-tax income. However, the right amount depends on your goals and timeline. Use this calculator to see how different monthly amounts affect when you reach your goal.",
                },
              },
              {
                "@type": "Question",
                name: "What interest rate should I use for my savings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In 2026, high-yield savings accounts offer 4-5% APY. Traditional bank savings accounts offer 0.01-0.5%. For investment accounts, a conservative estimate is 7-10% for stocks and 4-5% for bonds. Use a lower rate to be conservative in your planning.",
                },
              },
              {
                "@type": "Question",
                name: "How does compound interest help my savings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compound interest means you earn interest on your interest. For example, $10,000 at 5% earns $500 in year one. In year two, you earn interest on $10,500, which is $525. Over decades, this compounding effect can double or triple your contributions.",
                },
              },
              {
                "@type": "Question",
                name: "Should I save or pay off debt first?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you have high-interest debt (credit cards at 20%+), paying that off first gives a guaranteed return higher than any savings account. However, building a small emergency fund ($1,000) first prevents you from going deeper into debt when unexpected expenses hit.",
                },
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Savings Goal Calculator",
            description:
              "Free savings goal calculator with compound interest. Plan your emergency fund, house down payment, vacation, or any financial goal.",
            url: "https://savings-goal-calculator-beryl.vercel.app",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </main>
  );
}

function TipCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
