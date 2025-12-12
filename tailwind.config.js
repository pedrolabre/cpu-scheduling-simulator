/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Process colors
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-gray-500',
    // Phase colors
    'bg-gray-400',
    // Text colors
    'text-blue-600',
    'text-green-600',
    'text-yellow-600',
    'text-purple-600',
    'text-pink-600',
    'text-indigo-600',
    'text-red-600',
    'text-teal-600',
    'text-orange-600',
    'text-gray-600',
    'text-gray-500',
    'text-white',
    // Border colors
    'border-teal-200',
    'border-teal-400',
    'border-blue-200',
    'border-blue-400',
    'border-indigo-200',
    'border-indigo-400',
    'border-purple-200',
    'border-purple-400',
    'border-pink-200',
    'border-pink-400',
    // Background variants
    'bg-teal-100',
    'bg-teal-200',
    'bg-blue-100',
    'bg-blue-200',
    'bg-indigo-100',
    'bg-indigo-200',
    'bg-purple-100',
    'bg-purple-200',
    'bg-pink-100',
    'bg-pink-200',
  ]
}
