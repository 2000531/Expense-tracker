
import React from 'react';

function ExpenseList({ expenses, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>{expense.date}</td>
            <td>
              <button onClick={() => onDelete(expense.id)} className="delete-button">
                Delete
              </button>
            </td>
          </tr>
        ))}
        {expenses.length === 0 && (
          <tr>
            <td colSpan="6">No expenses to display.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ExpenseList;