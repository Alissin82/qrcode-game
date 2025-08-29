import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './style.css';
import AOSInit from './utils/aos';

const queryClient = new QueryClient();

createRoot(
    document.getElementById('root')!,
).render(
    <QueryClientProvider client={queryClient}>
        <AOSInit />
        <App />
        <Toaster
            toastOptions={{
                className:
                    '!bg-base-200 !text-base-content',
            }}
        />
    </QueryClientProvider>,
);
