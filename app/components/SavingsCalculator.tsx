"use client";

import { useState, useMemo } from "react";
import {
  calculateSavings,
  formatCurrency,
  formatMonths,
  type SavingsInputs,
  type SavingsGoalType,
} from "../lib/savings-engine";

export default function SavingsCalculator({
  preset,
}: {
  preset?: SavingsGoalType;
}) {
  const [goalName, setGoalName] = useState(preset?.name ?? "My Savings Goal");
  const [goalAmount, setGoalAmount] = useState(preset?.goalAmount ?? 10000);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(
    preset?.monthlySuggestion ?? 500
  );
  const [annualReturn, setAnnualReturn] = useState(4.5);
  const [targetMonths, setTargetMonths] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);

  const inputs: SavingsInputs = {
    goalName,
    goalAmount,
    currentSavings,
    monthlyContribution,
    annualReturn,
    targetMonths,
  };

  const result = useMemo(() => calculateSavings(inputs), [
    goalAmount,
    currentSavings,
    monthlyContribution,
    annualReturn,
    targetMonths,
  ]);

  const progressPct = Math.min(
    100,
    ((currentSavings + result.totalContributions + result.totalInterest) /
      goalAmount) *
      100
  );

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Your Savings Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Goal Name">
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="input text-gray-900"
            />
          </Field>
          <Field label="Goal Amount ($)">
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(+e.target.value)}
              min={0}
              className="input text-gray-900"
            />
          </Field>
          <Field label="Current Savings ($)">
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(+e.target.value)}
              min={0}
              className="input text-gray-900"
            />
          </Field>
          <Field label="Monthly Contribution ($)">
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(+e.target.value)}
              min={0}
              className="input text-gray-900"
            />
          </Field>
          <Field label="Annual Return (%)">
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(+e.target.value)}
              step={0.1}
              min={0}
              max={30}
              className="input text-gray-900"
            />
          </Field>
          <Field label="Target Deadline (months, 0 = none)">
            <input
              type="number"
              value={targetMonths}
              onChange={(e) => setTargetMonths(+e.target.value)}
              min={0}
              className="input text-gray-900"
            />
          </Field>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Results</h2>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress to {formatCurrency(goalAmount)}</span>
            <span>{result.goalReached ? "Goal reached!" : `${Math.round(progressPct)}%`}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progressPct)}%` }}
            />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Time to Goal"
            value={
              result.goalReached
                ? formatMonths(result.monthsToGoal)
                : "50+ years"
            }
            color="text-emerald-600"
          />
          <StatCard
            label="Total Contributions"
            value={formatCurrency(result.totalContributions)}
            color="text-blue-600"
          />
          <StatCard
            label="Interest Earned"
            value={formatCurrency(result.totalInterest)}
            color="text-purple-600"
          />
          <StatCard
            label="Final Balance"
            value={formatCurrency(result.finalBalance)}
            color="text-gray-900"
          />
        </div>

        {/* Monthly needed for deadline */}
        {targetMonths > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-amber-800 font-medium">
              To reach {formatCurrency(goalAmount)} in{" "}
              {formatMonths(targetMonths)}, you need to save{" "}
              <span className="font-bold text-amber-900">
                {formatCurrency(result.monthlyNeeded)}/month
              </span>
              {result.monthlyNeeded <= monthlyContribution
                ? " - you're on track!"
                : ` - that's ${formatCurrency(result.monthlyNeeded - monthlyContribution)} more than your current contribution.`}
            </p>
          </div>
        )}

        {/* Growth chart (simple bar chart) */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Savings Growth</h3>
          <div className="flex items-end gap-[2px] h-40 bg-gray-50 rounded-xl p-3">
            {result.schedule
              .filter(
                (_, i) =>
                  i % Math.max(1, Math.floor(result.schedule.length / 40)) === 0
              )
              .map((m) => {
                const pct = Math.min(100, (m.balance / goalAmount) * 100);
                return (
                  <div
                    key={m.month}
                    className="flex-1 bg-emerald-400 rounded-t-sm min-w-[3px] transition-all hover:bg-emerald-500"
                    style={{ height: `${pct}%` }}
                    title={`Month ${m.month}: ${formatCurrency(m.balance)}`}
                  />
                );
              })}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1 px-3">
            <span>Month 1</span>
            <span>
              Month {result.schedule[result.schedule.length - 1]?.month}
            </span>
          </div>
        </div>

        {/* Schedule toggle */}
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="text-emerald-600 font-medium text-sm hover:underline"
        >
          {showSchedule ? "Hide" : "Show"} Monthly Schedule
        </button>

        {showSchedule && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2 pr-4">Month</th>
                  <th className="py-2 pr-4">Contribution</th>
                  <th className="py-2 pr-4">Interest</th>
                  <th className="py-2 pr-4">Balance</th>
                  <th className="py-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((m) => (
                  <tr
                    key={m.month}
                    className={`border-b ${
                      m.balance >= goalAmount ? "bg-emerald-50" : ""
                    }`}
                  >
                    <td className="py-2 pr-4 text-gray-800">{m.month}</td>
                    <td className="py-2 pr-4 text-gray-800">
                      {formatCurrency(m.contribution)}
                    </td>
                    <td className="py-2 pr-4 text-gray-800">
                      {formatCurrency(m.interest)}
                    </td>
                    <td className="py-2 pr-4 font-medium text-gray-900">
                      {formatCurrency(m.balance)}
                    </td>
                    <td className="py-2 text-gray-800">
                      {Math.round(m.progress)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
