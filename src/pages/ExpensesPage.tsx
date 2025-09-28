import { useState, useEffect } from 'react';
import './ExpensesPage.css';

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const EXPENSES_STORAGE_KEY = 'flow-mode-expenses';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem(EXPENSES_STORAGE_KEY);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount);

    if (description.trim() === '' || isNaN(amountNumber) || amountNumber <= 0) {
      alert('Please enter a valid description and a positive amount.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: amountNumber,
    };

    setExpenses([...expenses, newExpense]);
    
    setDescription('');
    setAmount('');
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
  <div className="expense-tracker">
    <h2>Expense Tracker</h2>

    <form onSubmit={handleAddExpense} className="expense-form">
      {/* The form stays the same */}
      <div className="form-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense description..."
          className="expense-input"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="expense-input"
          style={{ maxWidth: '120px' }}
        />
      </div>
      <button type="submit" className="add-expense-btn">Add Expense</button>
    </form>

    <h3>History</h3>
    {/* --- ADD THIS LOGIC --- */}
    {expenses.length === 0 ? (
      <p className="empty-state-message">No expenses logged yet.</p>
    ) : (
      <ul className="expense-list">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
            <span>{expense.description}</span>
            <div>
              <span className="expense-amount">-₹{expense.amount.toFixed(2)}</span>
              <button onClick={() => handleDeleteExpense(expense.id)} className="delete-btn" style={{ marginLeft: '1rem' }}>X</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}