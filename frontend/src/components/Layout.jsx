import React from 'react';

import useTheme from '../hooks/useTheme';


const Layout = ({ children }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen dark:bg-slate-950">


            {/* Content */}
            {children}
        </div>
    );
};

export default Layout;
