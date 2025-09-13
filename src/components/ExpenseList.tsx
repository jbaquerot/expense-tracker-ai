'use client';

import { useState, useMemo } from 'react';
import { Expense, ExpenseFilters, ExpenseCategory } from '@/types';
import { formatCurrency, formatDate, exportToCSV } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ExpenseListProps {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const categories: Array<ExpenseCategory | 'All'> = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

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
    Food: 'bg-orange-100 text-orange-800',
    Transportation: 'bg-blue-100 text-blue-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Bills: 'bg-red-100 text-red-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export default function ExpenseList({ expenses, onEditExpense, onDeleteExpense }: ExpenseListProps) {
  const [filters, setFilters] = useState<ExpenseFilters>({
    category: 'All',
    dateFrom: '',
    dateTo: '',
    searchTerm: '',
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesCategory = filters.category === 'All' || expense.category === filters.category;

      const matchesDateFrom = !filters.dateFrom || expense.date >= filters.dateFrom;

      const matchesDateTo = !filters.dateTo || expense.date <= filters.dateTo;

      const matchesSearch = !filters.searchTerm ||
        expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesCategory && matchesDateFrom && matchesDateTo && matchesSearch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, filters]);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleExport = () => {
    if (filteredExpenses.length > 0) {
      exportToCSV(filteredExpenses);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Expense History</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              disabled={filteredExpenses.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as ExpenseCategory | 'All' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="date-from"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="date-to"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              placeholder="Search expenses..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {filteredExpenses.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} •
              Total: <span className="font-semibold">{formatCurrency(totalAmount)}</span>
            </p>
          </div>
        )}
      </div>

      <div className="p-6">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
            <p className="text-gray-600">
              {expenses.length === 0
                ? "Start tracking your expenses by adding your first expense above."
                : "Try adjusting your filters to see more expenses."
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.map(expense => (
              <div
                key={expense.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{getCategoryIcon(expense.category)}</span>
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        getCategoryColor(expense.category)
                      )}>
                        {expense.category}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                    </div>

                    <h3 className="font-medium text-gray-900 truncate mb-1">
                      {expense.description}
                    </h3>

                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => onEditExpense(expense)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this expense?')) {
                          onDeleteExpense(expense.id);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}