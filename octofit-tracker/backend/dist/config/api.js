"use strict";
/**
 * API URL Configuration
 * Handles both Codespaces and localhost environments
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCodespaces = exports.getServerPort = exports.getApiBaseUrl = exports.getApiUrl = void 0;
const getApiUrl = () => {
    const codespaceNameFromEnv = process.env.CODESPACE_NAME;
    const port = process.env.PORT || 8000;
    if (codespaceNameFromEnv) {
        // Codespaces environment
        return `https://${codespaceNameFromEnv}-8000.app.github.dev`;
    }
    // Localhost environment
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
const getApiBaseUrl = () => {
    return `${(0, exports.getApiUrl)()}/api`;
};
exports.getApiBaseUrl = getApiBaseUrl;
const getServerPort = () => {
    return process.env.PORT || 8000;
};
exports.getServerPort = getServerPort;
const isCodespaces = () => {
    return !!process.env.CODESPACE_NAME;
};
exports.isCodespaces = isCodespaces;
exports.default = {
    getApiUrl: exports.getApiUrl,
    getApiBaseUrl: exports.getApiBaseUrl,
    getServerPort: exports.getServerPort,
    isCodespaces: exports.isCodespaces,
};
//# sourceMappingURL=api.js.map