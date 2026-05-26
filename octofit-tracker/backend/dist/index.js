"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const api_1 = require("./config/api");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
(0, database_1.connectDatabase)().catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});
// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        apiUrl: (0, api_1.getApiUrl)(),
        environment: (0, api_1.isCodespaces)() ? 'Codespaces' : 'localhost',
        endpoints: {
            users: `${(0, api_1.getApiBaseUrl)()}/users`,
            teams: `${(0, api_1.getApiBaseUrl)()}/teams`,
            activities: `${(0, api_1.getApiBaseUrl)()}/activities`,
            leaderboard: `${(0, api_1.getApiBaseUrl)()}/leaderboard`,
            workouts: `${(0, api_1.getApiBaseUrl)()}/workouts`,
            health: `${(0, api_1.getApiBaseUrl)()}/health`,
        },
    });
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        apiUrl: (0, api_1.getApiUrl)(),
        environment: (0, api_1.isCodespaces)() ? 'Codespaces' : 'localhost',
    });
});
// Mount route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start Server
app.listen(PORT, () => {
    const apiUrl = (0, api_1.getApiUrl)();
    const environment = (0, api_1.isCodespaces)() ? 'Codespaces' : 'localhost';
    console.log(`\n✓ OctoFit Tracker API Server Started`);
    console.log(`  Environment: ${environment}`);
    console.log(`  API URL: ${apiUrl}`);
    console.log(`  Port: ${PORT}`);
    console.log(`  Base Path: ${(0, api_1.getApiBaseUrl)()}\n`);
});
//# sourceMappingURL=index.js.map