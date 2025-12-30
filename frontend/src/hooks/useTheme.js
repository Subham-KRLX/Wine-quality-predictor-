import { useState, useEffect } from 'react';

const useTheme = () => {
    // Always false for light mode
    const isDark = false;

    useEffect(() => {
        // Enforce light mode on mount
        document.documentElement.classList.remove('dark');
        localStorage.removeItem('theme');
    }, []);

    const toggleTheme = () => {
        // No-op
    };

    return { isDark, toggleTheme };
};

export default useTheme;
