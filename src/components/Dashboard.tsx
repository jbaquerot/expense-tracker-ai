'use client';

import { useMemo, useState } from 'react';
import { Expense, ExpenseCategory } from '@/types';
import { calculateExpenseSummary, formatCurrency } from '@/lib/utils';
import ExportHub from './ExportHub';

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
  const [isExportHubOpen, setIsExportHubOpen] = useState(false);
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
      {/* Cloud Export Header */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M21 15.586c0-.074-.064-.135-.09-.156a1 1 0 00-.336-.18c-.335-.071-.688.101-.954.283a4 4 0 00-.895.92l-.001.001c-.192.294-.309.618-.309.956v5.59" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Expense Dashboard</h2>
              <p className="text-gray-600">Connected • Auto-sync enabled • {expenses.length} expenses tracked</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Sync</span>
              </div>
              <div className="text-gray-500">
                Last backup: 2 min ago
              </div>
            </div>
            <button
              onClick={() => setIsExportHubOpen(true)}
              disabled={expenses.length === 0}
              className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <span className="relative flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Export Hub</span>
                <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
                  Pro
                </div>
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>
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

      {/* Export Hub Modal */}
      <ExportHub
        expenses={expenses}
        isOpen={isExportHubOpen}
        onClose={() => setIsExportHubOpen(false)}
      />
    </div>
  );
}