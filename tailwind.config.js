/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // Arquivos JavaScript e TypeScript na pasta src
  "./App.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export const plugins = [];
