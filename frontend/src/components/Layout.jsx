import React from 'react';
import { Wine } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen dark:bg-slate-950">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800 border-b dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <Wine className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            <span className="text-xl font-serif font-bold text-wine-900 dark:text-white">VinoPredict</span>
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} navBar={true} />
                    </div>
                </div>
            </nav>

            {/* Content */}
            {children}
        </div>
    );
};

export default Layout;
