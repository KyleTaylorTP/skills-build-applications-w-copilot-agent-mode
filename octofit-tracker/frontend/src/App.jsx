import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function getApiBase() {
  const name = import.meta.env.VITE_CODESPACE_NAME
  if (name) {
    return `https://${name}-8000.app.github.dev/api`
  }

  // Safe fallback to local API to avoid URLs containing "undefined"
  // (useful when not running in Codespaces)
  console.warn('VITE_CODESPACE_NAME is not defined — falling back to http://localhost:8000/api')
  return 'http://localhost:8000/api'
}

function Home() {
  return (
    <section>
      <h1>Octofit Tracker</h1>
      <p>Use the navigation links to explore API-backed pages.</p>
    </section>
  )
}

function App() {
  const apiBase = getApiBase()

  return (
    <div className="app-container">
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/workouts">Workouts</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
