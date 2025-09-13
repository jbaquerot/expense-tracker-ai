import { Expense } from '@/types';

const STORAGE_KEY = 'expense-tracker-expenses';

export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
};

export const loadExpenses = (): Expense[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse stored expenses:', error);
    return [];
  }
};

export const addExpense = (expense: Expense): Expense[] => {
  const expenses = loadExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
  return expenses;
};

export const updateExpense = (updatedExpense: Expense): Expense[] => {
  const expenses = loadExpenses();
  const index = expenses.findIndex(expense => expense.id === updatedExpense.id);

  if (index !== -1) {
    expenses[index] = updatedExpense;
    saveExpenses(expenses);
  }

  return expenses;
};

export const deleteExpense = (expenseId: string): Expense[] => {
  const expenses = loadExpenses();
  const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);
  saveExpenses(filteredExpenses);
  return filteredExpenses;
};

export const clearAllExpenses = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};