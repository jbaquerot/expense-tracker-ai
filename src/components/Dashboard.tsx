'use client';

import { useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types';
import { calculateExpenseSummary, formatCurrency } from '@/lib/utils';

interface DashboardProps {
  expenses: Expense[];
}

const getCategoryIcon = (category: ExpenseCategory) => {
  const icons = {
    Food: '🍽️',
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
    Food: 'bg-orange-500',
    Transportation: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Shopping: 'bg-pink-500',
    Bills: 'bg-red-500',
    Other: 'bg-gray-500',
  };
  return colors[category] || 'bg-gray-500';
};

export default function Dashboard({ expenses }: DashboardProps) {
  const summary = useMemo(() => calculateExpenseSummary(expenses), [expenses]);

  const categoryData = useMemo(() => {
    const categories: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];
    const maxAmount = Math.max(...Object.values(summary.categorySummary));

    return categories.map(category => ({
      category,
      amount: summary.categorySummary[category],
      percentage: maxAmount > 0 ? (summary.categorySummary[category] / maxAmount) * 100 : 0,
    }));
  }, [summary.categorySummary]);

  const recentExpenses = useMemo(() => {
    return expenses
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Expense Tracker</h3>
          <p className="text-gray-600 mb-4">
            Start tracking your expenses to see your spending insights and analytics here.
          </p>
          <div className="text-sm text-gray-500">
            Add your first expense using the form above to get started!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(summary.totalExpenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(summary.monthlyTotal)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{getCategoryIcon(summary.topCategory.category)}</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-lg font-semibold text-gray-900">{summary.topCategory.category}</p>
              <p className="text-sm text-gray-600">{formatCurrency(summary.topCategory.amount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <div className="space-y-4">
            {categoryData.map(({ category, amount, percentage }) => (
              <div key={category} className="flex items-center">
                <div className="flex items-center flex-1 min-w-0">
                  <span className="text-lg mr-3">{getCategoryIcon(category)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {category}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getCategoryColor(category)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          {recentExpenses.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No expenses yet</p>
          ) : (
            <div className="space-y-3">
              {recentExpenses.map(expense => (
                <div key={expense.id} className="flex items-center">
                  <span className="text-lg mr-3">{getCategoryIcon(expense.category)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {expense.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}