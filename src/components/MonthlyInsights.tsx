'use client';

import { useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types';
import { calculateExpenseSummary, formatCurrency } from '@/lib/utils';

interface MonthlyInsightsProps {
  expenses: Expense[];
}

const getCategoryIcon = (category: ExpenseCategory) => {
  const icons = {
    Food: '🍔',
    Transportation: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Bills: '📄',
    Other: '📝',
  };
  return icons[category] || '📝';
};

const getCategoryColor = (category: ExpenseCategory) => {
  const colors = {
    Food: '#ef4444',      // red-500
    Transportation: '#3b82f6', // blue-500
    Entertainment: '#8b5cf6',  // violet-500
    Shopping: '#f59e0b',       // amber-500
    Bills: '#10b981',          // emerald-500
    Other: '#6b7280',          // gray-500
  };
  return colors[category] || '#6b7280';
};

const DonutChart = ({ categoryData }: { categoryData: Array<{category: ExpenseCategory, amount: number, percentage: number}> }) => {
  const validData = categoryData.filter(item => item.amount > 0);

  if (validData.length === 0) {
    return (
      <div className="w-48 h-48 mx-auto flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-sm">No data yet</div>
        </div>
      </div>
    );
  }

  let cumulativePercentage = 0;
  const radius = 80;
  const strokeWidth = 20;
  const center = 100;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg width="200" height="200" className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />
        {validData.map((item) => {
          const { category, percentage } = item;
          const color = getCategoryColor(category);

          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -cumulativePercentage * circumference / 100;

          cumulativePercentage += percentage;

          return (
            <circle
              key={category}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">Spending</div>
          <div className="text-sm text-gray-600 -mt-1">donut chart!</div>
        </div>
      </div>
    </div>
  );
};

const BudgetStreak = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-300 relative">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Streak</h3>
        <div className="text-5xl font-bold text-green-500 mb-2">12</div>
        <div className="text-gray-600 text-lg">days!</div>

        <div className="mt-4 flex justify-center">
          <div className="w-20 h-6 bg-gray-200 rounded-full relative overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: '80%' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-sm text-gray-500">
        Top 3!
      </div>
    </div>
  );
};

export default function MonthlyInsights({ expenses }: MonthlyInsightsProps) {
  const summary = useMemo(() => calculateExpenseSummary(expenses), [expenses]);

  const categoryData = useMemo(() => {
    const categories: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];
    const total = summary.totalExpenses;

    return categories
      .map(category => ({
        category,
        amount: summary.categorySummary[category],
        percentage: total > 0 ? (summary.categorySummary[category] / total) * 100 : 0,
      }))
      .filter(item => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [summary]);

  const topThreeCategories = categoryData.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Monthly Insights</h1>
        <div className="w-32 h-1 bg-gray-300 mx-auto">
          <div className="w-16 h-1 bg-gray-800"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <DonutChart categoryData={categoryData} />
        </div>

        <div className="space-y-4">
          {topThreeCategories.map(({ category, amount }) => (
            <div key={category} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
              <div
                className="w-4 h-8 rounded-sm mr-4"
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-3">{getCategoryIcon(category)}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{category}: {formatCurrency(amount)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BudgetStreak />
    </div>
  );
}