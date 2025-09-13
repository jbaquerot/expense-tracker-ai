import { useState, useEffect } from 'react';
import { Expense, ExpenseFormData } from '@/types';
import { loadExpenses, addExpense, updateExpense, deleteExpense } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = loadExpenses();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  const createExpense = (formData: ExpenseFormData): void => {
    const now = new Date().toISOString();
    const expense: Expense = {
      id: generateId(),
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
      createdAt: now,
      updatedAt: now,
    };

    const updatedExpenses = addExpense(expense);
    setExpenses(updatedExpenses);
  };

  const editExpense = (id: string, formData: ExpenseFormData): void => {
    const existingExpense = expenses.find(exp => exp.id === id);
    if (!existingExpense) return;

    const updatedExpense: Expense = {
      ...existingExpense,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
      updatedAt: new Date().toISOString(),
    };

    const updatedExpenses = updateExpense(updatedExpense);
    setExpenses(updatedExpenses);
  };

  const removeExpense = (id: string): void => {
    const updatedExpenses = deleteExpense(id);
    setExpenses(updatedExpenses);
  };

  return {
    expenses,
    isLoading,
    createExpense,
    editExpense,
    removeExpense,
  };
};