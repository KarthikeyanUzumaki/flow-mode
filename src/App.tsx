import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import ExpensesPage from "./pages/ExpensesPage";
import JournalPage from "./pages/JournalPage";
import './App.css'; // Make sure your CSS is imported

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* The content of the pages will show up here */}
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/journal" element={<JournalPage />} />
        </Routes>

        {/* Bottom Navigation Bar */}
        <nav className="bottom-nav">
          <Link to="/" className="nav-link">Tasks</Link>
          <Link to="/expenses" className="nav-link">Expenses</Link>
          <Link to="/journal" className="nav-link">Journal</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;