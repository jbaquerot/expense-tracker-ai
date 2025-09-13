import { Expense, ExpenseCategory, ExpenseSummary } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categorySummary: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach(expense => {
    categorySummary[expense.category] += expense.amount;
  });

  const topCategory = Object.entries(categorySummary).reduce(
    (max, [category, amount]) =>
      amount > max.amount ? { category: category as ExpenseCategory, amount } : max,
    { category: 'Other' as ExpenseCategory, amount: 0 }
  );

  return {
    totalExpenses,
    monthlyTotal,
    categorySummary,
    topCategory,
  };
};

export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      expense.date,
      `"${expense.description}"`,
      expense.category,
      expense.amount.toString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};