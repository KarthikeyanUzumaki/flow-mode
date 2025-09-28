import { useState, useEffect } from 'react'; // 1. Import useEffect
import './TasksPage.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// A key for localStorage to avoid conflicts with other websites
const TASKS_STORAGE_KEY = 'flow-mode-tasks';

export default function TasksPage() {
  // 2. Modify useState to load initial data
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTaskText, setNewTaskText] = useState('');

  // 3. Add useEffect to save data on any change to 'tasks'
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);


  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };
  
  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // The JSX (visual part) remains the same
  return (
  <div className="task-manager">
    <h2>Task Manager</h2>

    <form onSubmit={handleAddTask} className="task-form">
      {/* The form stays the same */}
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button type="submit" className="add-task-btn">Add</button>
    </form>

    {/* --- ADD THIS LOGIC --- */}
    {tasks.length === 0 ? (
      <p className="empty-state-message">No tasks yet. Add one above!</p>
    ) : (
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span>{task.text}</span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}