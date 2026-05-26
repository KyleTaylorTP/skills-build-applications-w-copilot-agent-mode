"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Helper function to get API URL with Codespaces support
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;
    }
    return `http://localhost:${PORT}`;
};
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
        apiUrl: getApiUrl(),
        endpoints: {
            users: '/api/users',
            teams: '/api/teams',
            activities: '/api/activities',
            leaderboard: '/api/leaderboard',
            workouts: '/api/workouts',
            health: '/api/health',
        },
    });
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), apiUrl: getApiUrl() });
});
// Mount route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${getApiUrl()}`);
    console.log(`Port: ${PORT}`);
});
//# sourceMappingURL=index.js.map