
import React, { useState, useCallback } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      name,
      description,
      category,
      amount: parseFloat(amount),
      date,
    };
    onAddExpense(newExpense);
    setName('');
    setDescription('');
    setCategory('');
    setAmount('');
    setDate('');
  }, [name, description, category, amount, date, onAddExpense]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="expense-name">Expense Name:</label>
        <input
          type="text"
          id="expense-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expense-description">Description:</label>
        <input
          type="text"
          id="expense-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expense-category">Category:</label>
        <input
          type="text"
          id="expense-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expense-amount">Amount:</label>
        <input
          type="number"
          id="expense-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expense-date">Date:</label>
        <input
          type="date"
          id="expense-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;