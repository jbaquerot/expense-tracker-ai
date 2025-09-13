# 💰 Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances, categorize expenses, and gain insights into your spending habits.

## ✨ Features

### Core Functionality
- **Add Expenses**: Create new expenses with amount, description, category, and date
- **Edit & Delete**: Modify or remove existing expenses
- **Categories**: Organize expenses into predefined categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **Data Persistence**: All data is automatically saved to localStorage
- **Form Validation**: Comprehensive validation for expense inputs

### Dashboard & Analytics
- **Dashboard Overview**: Visual summary of your spending patterns
- **Summary Cards**: Total expenses, monthly spending, and top category
- **Category Breakdown**: Visual chart showing spending by category
- **Recent Expenses**: Quick view of your latest transactions

### Search & Filter
- **Category Filter**: Filter expenses by specific categories
- **Date Range Filter**: View expenses within a specific date range
- **Search**: Find expenses by description
- **Export**: Export filtered expenses to CSV format

### Design & UX
- **Modern Interface**: Clean, professional design with intuitive navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Visual Feedback**: Loading states, hover effects, and smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd expense-tracker-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and visit [http://localhost:3001](http://localhost:3001) (or the port shown in your terminal)

## 🎯 How to Use

### Getting Started
1. **Dashboard**: When you first open the app, you'll see the dashboard with a welcome message
2. **Add Your First Expense**: Click on "Expenses" in the navigation to start adding expenses

### Adding Expenses
1. Navigate to the **Expenses** tab
2. Fill out the expense form:
   - **Amount**: Enter the expense amount (numbers only)
   - **Description**: Describe what you spent money on
   - **Category**: Select from the available categories
   - **Date**: Choose the date of the expense
3. Click **Add Expense** to save

### Managing Expenses
- **Edit**: Click the "Edit" button next to any expense to modify it
- **Delete**: Click the "Delete" button and confirm to remove an expense
- **Filter**: Use the filter controls to find specific expenses:
  - Filter by category
  - Set date ranges (from/to dates)
  - Search by description text

### Viewing Analytics
1. Go to the **Dashboard** tab to see:
   - **Total Expenses**: Your overall spending
   - **Monthly Total**: Current month's spending
   - **Top Category**: Your highest spending category
   - **Category Breakdown**: Visual representation of spending by category
   - **Recent Expenses**: Your latest transactions

### Exporting Data
1. In the **Expenses** tab, apply any filters you want
2. Click **Export CSV** to download your expense data
3. The CSV file will include all filtered expenses with date, description, category, and amount

## 🛠️ Technical Details

### Built With
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Local Storage** - Client-side data persistence

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── Dashboard.tsx    # Analytics and summary
│   ├── ExpenseForm.tsx  # Add/edit expense form
│   ├── ExpenseList.tsx  # List with filters and search
│   └── Navigation.tsx   # App navigation
├── hooks/              # Custom React hooks
│   └── useExpenses.ts  # Expense management logic
├── lib/                # Utility functions
│   ├── storage.ts      # LocalStorage operations
│   └── utils.ts        # Helper functions
└── types/              # TypeScript type definitions
    └── index.ts        # All type definitions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

This application follows modern web design principles:

- **Clean & Minimal**: Focused on content with minimal distractions
- **Professional**: Suitable for personal or professional use
- **Intuitive**: Easy to learn and use without documentation
- **Accessible**: Works well with keyboards and screen readers
- **Responsive**: Adapts to any screen size

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Privacy & Data

- All data is stored locally in your browser
- No data is sent to external servers
- Your financial information remains completely private
- Data persists between browser sessions

## 🤝 Contributing

This is a demo project, but feel free to:
- Report issues or bugs
- Suggest new features
- Submit improvements via pull requests

## 📄 License

This project is open source and available under the MIT License.