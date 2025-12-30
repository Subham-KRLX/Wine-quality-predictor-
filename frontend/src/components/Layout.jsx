import React from 'react';
import { Wine } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen dark:bg-slate-950">
            {/* Theme Toggle (Fixed Position) */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* Content */}
            {children}
        </div>
    );
};

export default Layout;
