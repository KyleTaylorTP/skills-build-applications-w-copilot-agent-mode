/**
 * API URL Configuration
 * Handles both Codespaces and localhost environments
 */

export const getApiUrl = (): string => {
  const codespaceNameFromEnv = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codespaceNameFromEnv) {
    // Codespaces environment
    return `https://${codespaceNameFromEnv}-8000.app.github.dev`;
  }

  // Localhost environment
  return `http://localhost:${port}`;
};

export const getApiBaseUrl = (): string => {
  return `${getApiUrl()}/api`;
};

export const getServerPort = (): number | string => {
  return process.env.PORT || 8000;
};

export const isCodespaces = (): boolean => {
  return !!process.env.CODESPACE_NAME;
};

export default {
  getApiUrl,
  getApiBaseUrl,
  getServerPort,
  isCodespaces,
};
