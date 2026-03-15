export interface SavingsInputs {
  goalName: string;
  goalAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number; // %
  targetMonths: number; // optional deadline in months
}

export interface SavingsMonth {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
  progress: number; // % toward goal
}

export interface SavingsResult {
  monthsToGoal: number;
  totalContributions: number;
  totalInterest: number;
  finalBalance: number;
  schedule: SavingsMonth[];
  goalReached: boolean;
  monthlyNeeded: number; // monthly contribution needed if deadline set
}

export function calculateSavings(inputs: SavingsInputs): SavingsResult {
  const { goalAmount, currentSavings, monthlyContribution, annualReturn } = inputs;
  const monthlyRate = annualReturn / 100 / 12;

  const schedule: SavingsMonth[] = [];
  let balance = currentSavings;
  let monthsToGoal = -1;
  let totalContributions = 0;
  let totalInterest = 0;
  const maxMonths = 600;

  for (let m = 1; m <= maxMonths; m++) {
    const interest = balance * monthlyRate;
    balance += monthlyContribution + interest;
    totalContributions += monthlyContribution;
    totalInterest += interest;

    const progress = Math.min(100, (balance / goalAmount) * 100);

    schedule.push({
      month: m,
      contribution: monthlyContribution,
      interest: Math.round(interest),
      balance: Math.round(balance),
      progress,
    });

    if (monthsToGoal === -1 && balance >= goalAmount) {
      monthsToGoal = m;
    }

    if (balance >= goalAmount && m > monthsToGoal + 12) break;
  }

  // Calculate monthly needed for a deadline
  let monthlyNeeded = 0;
  if (inputs.targetMonths > 0) {
    const remaining = goalAmount - currentSavings;
    if (monthlyRate > 0) {
      const factor = (Math.pow(1 + monthlyRate, inputs.targetMonths) - 1) / monthlyRate;
      const futureCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, inputs.targetMonths);
      monthlyNeeded = Math.max(0, (goalAmount - futureCurrentSavings) / factor);
    } else {
      monthlyNeeded = remaining / inputs.targetMonths;
    }
  }

  return {
    monthsToGoal: monthsToGoal === -1 ? maxMonths : monthsToGoal,
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    finalBalance: Math.round(balance),
    schedule: schedule.slice(0, monthsToGoal === -1 ? 120 : monthsToGoal + 6),
    goalReached: monthsToGoal !== -1,
    monthlyNeeded: Math.round(monthlyNeeded),
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) return "$" + (amount / 1000000).toFixed(1) + "M";
  return "$" + amount.toLocaleString("en-US");
}

export function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} month${rem !== 1 ? "s" : ""}`;
  if (rem === 0) return `${years} year${years !== 1 ? "s" : ""}`;
  return `${years}y ${rem}m`;
}

export interface SavingsGoalType {
  slug: string;
  name: string;
  description: string;
  goalAmount: number;
  monthlySuggestion: number;
  tips: string[];
  seoTitle: string;
  seoDescription: string;
}

export const savingsGoals: SavingsGoalType[] = [
  {
    slug: "emergency-fund",
    name: "Emergency Fund",
    description: "Build a 3-6 month emergency fund to protect yourself from unexpected expenses like job loss, medical bills, or car repairs. Financial experts recommend having 3-6 months of living expenses saved in a high-yield savings account.",
    goalAmount: 15000,
    monthlySuggestion: 500,
    tips: [
      "Start with a mini emergency fund of $1,000 then build to 3-6 months of expenses",
      "Keep it in a high-yield savings account earning 4-5% APY",
      "Automate transfers on payday so you save before you spend",
      "Only use it for true emergencies, not wants",
      "Replenish it immediately after any withdrawal",
    ],
    seoTitle: "Emergency Fund Calculator - How Long to Save 3-6 Months?",
    seoDescription: "Free emergency fund savings calculator. See how long it takes to build your 3-6 month emergency fund and how much to save monthly.",
  },
  {
    slug: "house-down-payment",
    name: "House Down Payment",
    description: "Saving for a house down payment is one of the biggest savings goals most people face. A 20% down payment on a $350,000 home is $70,000. While you can put down less, 20% avoids PMI (private mortgage insurance) which saves hundreds per month.",
    goalAmount: 70000,
    monthlySuggestion: 1500,
    tips: [
      "Open a dedicated high-yield savings account for your down payment",
      "Consider a first-time homebuyer program for lower down payment options",
      "Factor in closing costs (2-5% of home price) on top of down payment",
      "Avoid investing down payment money in stocks if buying within 3 years",
      "Look into state and local down payment assistance programs",
    ],
    seoTitle: "House Down Payment Calculator - Save for Your First Home",
    seoDescription: "Free down payment savings calculator. See how long to save for a house down payment and how much you need monthly to reach your goal.",
  },
  {
    slug: "vacation-fund",
    name: "Vacation Fund",
    description: "Planning a vacation? Save in advance instead of going into debt. The average American vacation costs $2,000-5,000. Setting up a dedicated vacation fund and saving monthly means you can enjoy your trip guilt-free.",
    goalAmount: 5000,
    monthlySuggestion: 400,
    tips: [
      "Set up a separate savings account labeled for your trip",
      "Book flights and hotels early for better deals",
      "Use travel credit card rewards to offset costs",
      "Save in the currency of your destination if it is stronger than the dollar",
      "Budget for daily spending money on top of flights and hotels",
    ],
    seoTitle: "Vacation Savings Calculator - Save for Your Dream Trip",
    seoDescription: "Free vacation savings calculator. Plan your trip fund, see how much to save monthly, and reach your vacation goal without going into debt.",
  },
  {
    slug: "new-car",
    name: "New Car Fund",
    description: "Saving for a car in cash or a large down payment saves you thousands in interest. The average new car costs $48,000 and the average used car $27,000. Even a 50% down payment drastically reduces your loan cost.",
    goalAmount: 25000,
    monthlySuggestion: 800,
    tips: [
      "Consider buying used, 2-3 years old with low mileage for the best value",
      "A larger down payment means a smaller loan and less interest paid",
      "Get pre-approved for financing before going to the dealer",
      "Factor in insurance, registration, and maintenance costs",
      "Paying cash gives you maximum negotiating power",
    ],
    seoTitle: "Car Savings Calculator - Save for Your Next Vehicle",
    seoDescription: "Free car savings calculator. Plan your car fund, calculate monthly savings needed, and see when you can afford your next vehicle.",
  },
  {
    slug: "wedding-fund",
    name: "Wedding Fund",
    description: "The average wedding in the US costs $30,000-35,000. Starting to save early and setting a realistic budget prevents wedding debt. Many couples save for 1-2 years before their wedding date.",
    goalAmount: 30000,
    monthlySuggestion: 1200,
    tips: [
      "Set a firm budget before planning anything",
      "Prioritize what matters most to you as a couple",
      "Off-season weddings (November-March) cost significantly less",
      "DIY what you can but hire professionals for photography and food",
      "Open a joint savings account specifically for wedding expenses",
    ],
    seoTitle: "Wedding Savings Calculator - Plan Your Wedding Budget",
    seoDescription: "Free wedding savings calculator. See how long to save for your wedding and how much to set aside monthly to avoid wedding debt.",
  },
  {
    slug: "college-fund",
    name: "College Fund",
    description: "The average cost of 4 years at a public university is $100,000+ including room and board. Starting early is crucial because compound interest does the heavy lifting. A 529 plan offers tax-advantaged growth for education savings.",
    goalAmount: 100000,
    monthlySuggestion: 500,
    tips: [
      "Open a 529 plan for tax-free growth on education expenses",
      "Start as early as possible, even with small amounts",
      "Many states offer tax deductions for 529 contributions",
      "Scholarships and financial aid can reduce the amount needed",
      "Consider community college for the first 2 years to cut costs in half",
    ],
    seoTitle: "College Savings Calculator - Plan Your Education Fund",
    seoDescription: "Free college savings calculator. See how much to save monthly for college and how a 529 plan can grow your education fund with compound interest.",
  },
  {
    slug: "retirement-savings",
    name: "Retirement Savings",
    description: "Most financial advisors recommend saving 15% of your income for retirement. With compound interest over 30-40 years, even modest monthly contributions can grow to over a million dollars. Start as early as possible.",
    goalAmount: 1000000,
    monthlySuggestion: 1000,
    tips: [
      "Contribute at least enough to get your employer 401k match (free money)",
      "Max out Roth IRA ($7,000/year in 2026) for tax-free growth",
      "Increase contributions by 1% every year",
      "Low-cost index funds (S&P 500, total market) beat most active managers",
      "Do not withdraw early, the compound growth in the last 10 years is massive",
    ],
    seoTitle: "Retirement Savings Calculator - How Much Do You Need?",
    seoDescription: "Free retirement savings calculator. See how much you need to save monthly to reach your retirement goal with compound interest.",
  },
  {
    slug: "debt-freedom",
    name: "Debt Freedom Fund",
    description: "Building a lump sum to pay off remaining debt can be a powerful strategy, especially for negotiating settlements. Many creditors accept 40-60% of the balance as a lump sum settlement.",
    goalAmount: 10000,
    monthlySuggestion: 500,
    tips: [
      "Save in a separate account earmarked for debt payoff",
      "Once you hit a good amount, call creditors and negotiate a settlement",
      "Get any settlement agreement in writing before paying",
      "Focus on one debt at a time for maximum psychological impact",
      "After paying off debt, redirect those payments to savings",
    ],
    seoTitle: "Debt Freedom Savings Calculator - Save to Pay Off Debt",
    seoDescription: "Free debt freedom savings calculator. Plan a lump sum savings fund to pay off or settle your debts faster.",
  },
];

export function getGoalBySlug(slug: string): SavingsGoalType | undefined {
  return savingsGoals.find((g) => g.slug === slug);
}
