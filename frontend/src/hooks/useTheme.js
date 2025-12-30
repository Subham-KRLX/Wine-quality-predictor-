import { useState, useEffect } from 'react';

const useTheme = () => {
    // Always true for dark mode
    const isDark = true;

    useEffect(() => {
        // Enforce dark mode on mount
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // No-op
    };

    return { isDark, toggleTheme };
};

export default useTheme;
