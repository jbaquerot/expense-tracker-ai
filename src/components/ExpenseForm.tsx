'use client';

import { useState } from 'react';
import { ExpenseFormData, ExpenseCategory } from '@/types';
import { cn } from '@/lib/utils';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: ExpenseFormData;
  onCancel?: () => void;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export default function ExpenseForm({ onSubmit, initialData, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: initialData?.amount || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Other',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ExpenseFormData> = {};

    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);

      if (!initialData) {
        setFormData({
          amount: '',
          description: '',
          category: 'Other',
          date: new Date().toISOString().split('T')[0],
        });
      }
    }
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, amount: numericValue }));

    if (errors.amount && numericValue && parseFloat(numericValue) > 0) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={cn(
                'w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                errors.amount ? 'border-red-500' : 'border-gray-300'
              )}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, description: e.target.value }));
              if (errors.description && e.target.value.trim()) {
                setErrors(prev => ({ ...prev, description: undefined }));
              }
            }}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              errors.description ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="What did you spend on?"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ExpenseCategory }))}
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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, date: e.target.value }));
              if (errors.date && e.target.value) {
                setErrors(prev => ({ ...prev, date: undefined }));
              }
            }}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              errors.date ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {initialData ? 'Update Expense' : 'Add Expense'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}