import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: [
            'game.silitonix.ir',
            'https://game.silitonix.ir',
            'game_.silitonix.ir',
            'https://game_.silitonix.ir',
        ],
        host: true,
        port: 5173, // or any port you prefer
    },
});
