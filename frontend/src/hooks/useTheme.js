import { useState, useEffect } from 'react';

const useTheme = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(shouldBeDark);
        
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return { isDark, toggleTheme };
};

export default useTheme;
