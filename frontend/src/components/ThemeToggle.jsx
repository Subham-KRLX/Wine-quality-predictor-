import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, toggleTheme, navBar = false }) => {
    if (navBar) {
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-700 transition-all shadow-sm"
                aria-label="Toggle dark mode"
            >
                {isDark ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                )}
            </motion.button>
        );
    }

    // Fixed position toggle for homepage
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full glass hover:bg-white/20 dark:hover:bg-black/30 border-2 border-white/40 dark:border-white/20 transition-all shadow-lg"
            aria-label="Toggle dark mode"
        >
            {isDark ? (
                <Sun className="h-6 w-6 text-amber-400" />
            ) : (
                <Moon className="h-6 w-6 text-slate-700" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
