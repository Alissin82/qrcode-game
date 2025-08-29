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
        themes: [
            {
                light: {
                    // This uses the default light theme as a base
                    ...require('daisyui/src/theming/themes')[
                        'light'
                    ],

                    // Now, we override the colors with your custom ones
                    primary: '#00b48d',
                    'primary-content': '#ffffff', // Added a contrasting color for text on primary
                    secondary: '#ef4770',
                    accent: '#074f9a', // DaisyUI uses 'accent', not 'tertiary'
                    neutral: '#fcb917', // You can map your colors to semantic names

                    // You can also add your other custom colors here
                    '--font-display': 'dana',
                    '--color-primary-light':
                        '#e6fbfa',
                    '--color-icon-light':
                        '#8adcd7',
                    '--color-primary-text':
                        '#065b56',
                },
            },
        ],
        darkTheme: false, // Disables dark mode completely
        base: true,
        styled: true,
        utils: true,
        logs: true,
    },
};
