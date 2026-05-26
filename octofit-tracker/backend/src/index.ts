import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { getApiUrl, getApiBaseUrl, isCodespaces } from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDatabase().catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiUrl: getApiUrl(),
    environment: isCodespaces() ? 'Codespaces' : 'localhost',
    endpoints: {
      users: `${getApiBaseUrl()}/users`,
      teams: `${getApiBaseUrl()}/teams`,
      activities: `${getApiBaseUrl()}/activities`,
      leaderboard: `${getApiBaseUrl()}/leaderboard`,
      workouts: `${getApiBaseUrl()}/workouts`,
      health: `${getApiBaseUrl()}/health`,
    },
  });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    apiUrl: getApiUrl(),
    environment: isCodespaces() ? 'Codespaces' : 'localhost',
  });
});

// Mount route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start Server
app.listen(PORT, () => {
  const apiUrl = getApiUrl();
  const environment = isCodespaces() ? 'Codespaces' : 'localhost';
  console.log(`\n✓ OctoFit Tracker API Server Started`);
  console.log(`  Environment: ${environment}`);
  console.log(`  API URL: ${apiUrl}`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Base Path: ${getApiBaseUrl()}\n`);
});
