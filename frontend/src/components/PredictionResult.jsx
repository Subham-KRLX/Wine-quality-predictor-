import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Sparkles, TrendingUp, AlertCircle, XCircle } from 'lucide-react';

const getWineStrength = (alcohol) => {
    if (alcohol < 10) return { label: 'Light-bodied', icon: '🍃', color: '#60a5fa', description: 'Delicate and easy-drinking', pairing: 'Salads, seafood, light appetizers' };
    if (alcohol < 12.5) return { label: 'Medium-bodied', icon: '🌿', color: '#34d399', description: 'Balanced and versatile', pairing: 'Poultry, pasta, soft cheeses' };
    return { label: 'Full-bodied', icon: '🔥', color: '#f97316', description: 'Rich and robust', pairing: 'Red meat, aged cheese, hearty stews' };
};

const getTastingNote = (quality_score, alcohol, wineType) => {
    const strength = getWineStrength(alcohol);
    const wineTypeName = wineType === 0 ? 'red wine' : 'white wine';

    if (quality_score >= 7) {
        return `Exceptional ${wineTypeName} with ${strength.label.toLowerCase()} character. Expect complex flavors and a smooth finish. Perfect for special occasions.`;
    } else if (quality_score >= 5) {
        return `Pleasant ${wineTypeName} with ${strength.label.toLowerCase()} profile. Good everyday drinking wine with balanced characteristics.`;
    }
    return `Simple ${wineTypeName} with ${strength.label.toLowerCase()} structure. Best enjoyed chilled and consumed young.`;
};

const PredictionResult = ({ result, wineType, alcoholLevel }) => {
    if (!result) return null;

    const { quality_score, quality_label } = result;
    const strength = getWineStrength(alcoholLevel || 10);
    const tastingNote = getTastingNote(quality_score, alcoholLevel || 10, wineType);

    let qualityColor = "#fbbf24"; // yellow
    let qualityBg = "#fffbeb";
    let qualityBorder = "#fde68a";
    let Icon = AlertCircle;

    if (quality_label === "Good") {
        qualityColor = "#34d399"; // emerald
        qualityBg = "#ecfdf5";
        qualityBorder = "#a7f3d0";
        Icon = Sparkles;
    } else if (quality_label === "Poor") {
        qualityColor = "#f87171"; // red
        qualityBg = "#fef2f2";
        qualityBorder = "#fecaca";
        Icon = XCircle;
    }

    const percentage = Math.min(100, Math.max(0, ((quality_score - 3) / 6) * 100));

    // Wine theme colors
    const winePrimary = wineType === 0 ? '#722F37' : '#f1a64b';
    const wineLight = wineType === 0 ? '#fdf4f5' : '#fef5e3';
    const wineBorder = wineType === 0 ? '#f7d1d7' : '#fde9c6';
    const wineText = wineType === 0 ? '#881e3d' : '#975823';

    return (
        <div className="space-y-4">
            {/* Quality Score Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl border-2 shadow-lg"
                style={{ backgroundColor: qualityBg, borderColor: qualityBorder }}
            >
                <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: qualityColor }}>
                        <Icon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">Predicted Quality</h3>
                <div className="text-center text-6xl font-serif font-bold my-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                    {quality_score.toFixed(1)}
                </div>
                <div className="text-center text-xl font-medium mb-6 text-gray-700">{quality_label} Quality</div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                    <motion.div
                        className="h-3 rounded-full"
                        style={{ backgroundColor: qualityColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Poor (3)</span>
                    <span>Excellent (9)</span>
                </div>
            </motion.div>

            {/* Wine Strength Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl border-2 shadow-lg"
                style={{
                    borderColor: wineBorder,
                    background: `linear-gradient(135deg, ${wineLight} 0%, #ffffff 100%)`
                }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg text-2xl shadow-md" style={{ backgroundColor: strength.color }}>
                        {strength.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold" style={{ color: winePrimary }}>{strength.label}</h3>
                        <p className="text-sm" style={{ color: wineText }}>{strength.description}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border" style={{ borderColor: wineBorder }}>
                    <div className="flex items-start gap-2">
                        <Wine className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: winePrimary }} />
                        <div>
                            <h4 className="font-semibold text-sm mb-1" style={{ color: winePrimary }}>Tasting Note</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{tastingNote}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-lg p-4 border" style={{ borderColor: wineBorder }}>
                    <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: winePrimary }} />
                        <div>
                            <h4 className="font-semibold text-sm mb-1" style={{ color: winePrimary }}>Food Pairing Suggestions</h4>
                            <p className="text-sm text-gray-700">{strength.pairing}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PredictionResult;
