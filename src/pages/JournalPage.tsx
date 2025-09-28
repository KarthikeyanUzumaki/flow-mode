import { useState, useEffect } from 'react';
import './JournalPage.css';

interface JournalEntry {
  id: number;
  content: string;
  date: string;
}

const JOURNAL_STORAGE_KEY = 'flow-mode-journal';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem(JOURNAL_STORAGE_KEY);
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [newEntryContent, setNewEntryContent] = useState('');

  useEffect(() => {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntryContent.trim() === '') return;

    const newEntry: JournalEntry = {
      id: Date.now(),
      content: newEntryContent.trim(),
      date: new Date().toLocaleDateString('en-IN'),
    };

    setEntries([newEntry, ...entries]);
    setNewEntryContent('');
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

 return (
  <div className="journal">
    <h2>Digital Journal</h2>

    <form onSubmit={handleSaveEntry} className="journal-form">
      {/* The form stays the same */}
      <textarea
        value={newEntryContent}
        onChange={(e) => setNewEntryContent(e.target.value)}
        placeholder="Write your thoughts..."
        className="journal-textarea"
      />
      <button type="submit" className="save-entry-btn">Save Entry</button>
    </form>

    <h3>Past Entries</h3>
    {/* --- ADD THIS LOGIC --- */}
    {entries.length === 0 ? (
      <p className="empty-state-message">No journal entries yet. Write one above!</p>
    ) : (
      <ul className="entry-list">
        {entries.map(entry => (
          <li key={entry.id} className="entry-item">
            <div className="entry-header">
              <span className="entry-date">{entry.date}</span>
              <button onClick={() => handleDeleteEntry(entry.id)} className="delete-btn">Delete</button>
            </div>
            <p className="entry-content">{entry.content}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}