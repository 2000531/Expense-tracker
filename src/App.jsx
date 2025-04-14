import React, { useState, useCallback } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Lunch', description: "Wednesday's Lunch", category: 'Food', amount: 10, date: '2023-08-09' },
    { id: 2, name: 'ELectric Token', description: 'Electric tokens', category: 'Utilities', amount: 1000, date: '2023-08-07' },
    { id: 3, name: 'Buy Shirt', description: 'Add to my shirt collection', category: 'Personal', amount: 2500, date: '2023-08-07' },
    { id: 4, name: 'Buy Book', description: 'Add to my book collection', category: 'Growth', amount: 500, date: '2023-08-07' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null); // 'category' or 'description'

  const handleAddExpense = useCallback((newExpense) => {
    setExpenses([...expenses, newExpense]);
  }, [expenses]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleDeleteExpense = useCallback((idToDelete) => {
    setExpenses(expenses.filter(expense => expense.id !== idToDelete));
  }, [expenses]);

  const handleSort = useCallback((field) => {
    setSortBy(field);
  }, []);

  const sortedExpenses = React.useMemo(() => {
    if (!sortBy) {
      return [...expenses]; // Return a copy to avoid direct mutation
    }

    return [...expenses].sort((a, b) => {
      const aValue = a[sortBy].toLowerCase();
      const bValue = b[sortBy].toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }, [expenses, sortBy]);

  const filteredExpenses = React.useMemo(() => {
    return sortedExpenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedExpenses, searchTerm]);

  return (
    <div className="expense-tracker-container">
      <header>
        <h1>Expense Tracker</h1>
        <p>Keep track of your spending and live smart.</p>
      </header>

      <div className="main-content">
        <aside className="add-expense-section">
          <h2>Add Expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </aside>

        <section className="expense-list-section">
          <div className="controls">
            <SearchBar onSearch={handleSearch} />
            <div className="sort-buttons">
              <button onClick={() => handleSort('category')} className={sortBy === 'category' ? 'active' : ''}>
                Sort by Category
              </button>
              <button onClick={() => handleSort('description')} className={sortBy === 'description' ? 'active' : ''}>
                Sort by Description
              </button>
              {sortBy && (
                <button onClick={() => handleSort(null)}>Clear Sort</button>
              )}
            </div>
          </div>
          <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
        </section>
      </div>
    </div>
  );
}

export default App;