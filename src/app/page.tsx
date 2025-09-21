'use client';

import { useState } from 'react';
import { Expense, ExpenseFormData } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import MonthlyInsights from '@/components/MonthlyInsights';

export default function Home() {
  const { expenses, isLoading, createExpense, editExpense, removeExpense } = useExpenses();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'insights'>('dashboard');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleCreateExpense = (formData: ExpenseFormData) => {
    createExpense(formData);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('expenses');
  };

  const handleUpdateExpense = (formData: ExpenseFormData) => {
    if (editingExpense) {
      editExpense(editingExpense.id, formData);
      setEditingExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' ? (
          <Dashboard expenses={expenses} />
        ) : activeTab === 'insights' ? (
          <MonthlyInsights expenses={expenses} />
        ) : (
          <div className="space-y-6">
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
              initialData={
                editingExpense
                  ? {
                      amount: editingExpense.amount.toString(),
                      description: editingExpense.description,
                      category: editingExpense.category,
                      date: editingExpense.date,
                    }
                  : undefined
              }
              onCancel={editingExpense ? handleCancelEdit : undefined}
            />

            <ExpenseList
              expenses={expenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={removeExpense}
            />
          </div>
        )}
      </main>
    </div>
  );
}