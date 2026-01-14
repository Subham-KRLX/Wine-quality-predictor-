import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-describedby="tooltip-content"
        className="text-charcoal-500 hover:text-wine-400 cursor-help transition-colors outline-none focus:text-wine-400"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            id="tooltip-content"
            role="tooltip"
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-charcoal-900 border border-white/10 rounded-lg shadow-xl text-xs text-charcoal-200 text-center pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-charcoal-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
