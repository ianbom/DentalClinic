import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0da2e7',
                    dark: '#0a8bc7',
                },
                'background-light': '#f8fbfc',
                'background-dark': '#101c22',
                'text-light': '#0d171c',
                'text-dark': '#f8fbfc',
                'text-main-light': '#0d171c',
                'text-sub-light': '#6b7280',
                'subtle-light': '#e7f0f4',
                'subtle-dark': '#1e2a30',
                'border-subtle-light': '#e7f0f4',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
            },
        },
    },

    plugins: [forms],
};
