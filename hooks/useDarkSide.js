import { useEffect, useState } from "react";

export default function useDarkSide() {
    // Initialize state for theme
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = window.localStorage.getItem('theme');
            return storedTheme || 'light'; // Use stored theme or default to 'light'
        }
        return 'light'; // Default to 'light' if localStorage is not available
    });

    // Handle theme changes and update localStorage
    useEffect (() => {
        if (typeof window !== 'undefined') {
            // Update localStorage theme
            window.localStorage.setItem('theme', theme);
            // Update DOM with current theme
            const root = window.document.documentElement;
            const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
            root.style.setProperty('--background-color', theme === 'dark' ? 'black' : 'white');
            root.classList.remove(oppositeTheme);
            root.classList.add(theme);
        }
    }, [theme]);

    return [theme, setTheme];
}
