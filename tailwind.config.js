/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                // This makes Vazirmatn the default font for the `font-sans` utility class.
                sans: ['dana', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('daisyui'), // Ensure your plugins are required correctly
    ],
    // Your daisyUI config
    daisyui: {
        themes: ['light', 'dark'],
    },
};
