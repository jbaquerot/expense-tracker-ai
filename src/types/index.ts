export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: ExpenseCategory;
  date: string;
}

export interface ExpenseFilters {
  category: ExpenseCategory | 'All';
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyTotal: number;
  categorySummary: Record<ExpenseCategory, number>;
  topCategory: {
    category: ExpenseCategory;
    amount: number;
  };
}