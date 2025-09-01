export const config: Config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    host: import.meta.env.VITE_API_HOST,
    isProd: import.meta.env.PROD,
    token: import.meta.env.VITE_API_TOKEN,
};