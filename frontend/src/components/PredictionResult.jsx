import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wine, Sparkles, TrendingUp, AlertCircle, XCircle } from 'lucide-react';
import { gsap } from 'gsap';

const getWineStrength = (alcohol, wineType) => {
    // wineType: 0 for Red, 1 for White
    if (alcohol < 11) {
        return {
            label: 'Light-bodied',
            icon: '🍃',
            color: '#60a5fa',
            description: 'Delicate and easy-drinking',
            pairing: wineType === 0 ? 'Charcuterie, grilled vegetables, mushroom risotto' : 'Fresh salads, sushi, raw shellfish'
        };
    }
    if (alcohol < 13.5) {
        return {
            label: 'Medium-bodied',
            icon: '🌿',
            color: '#34d399',
            description: 'Balanced and versatile',
            pairing: wineType === 0 ? 'Roasted chicken, pork chops, burgers' : 'Grilled fish, creamy pasta, roast chicken'
        };
    }
    return {
        label: 'Full-bodied',
        icon: '🔥',
        color: '#f97316',
        description: 'Rich and robust',
        pairing: wineType === 0 ? 'Steak, lamb, hearty stews, aged cheese' : 'Lobster, rich chowders, soft ripened cheese'
    };
};


const PredictionResult = ({ result, wineType, alcoholLevel }) => {
    if (!result) return null;

    const getTastingNote = (quality_score, alcohol, wineType) => {
        const strength = getWineStrength(alcohol, wineType);
        const wineTypeName = wineType === 0 ? 'red wine' : 'white wine';

        if (quality_score >= 7) {
            return `Exceptional ${wineTypeName} with ${strength.label.toLowerCase()} character. Expect complex flavors and a smooth finish. Perfect for special occasions.`;
        } else if (quality_score >= 5) {
            return `Pleasant ${wineTypeName} with ${strength.label.toLowerCase()} profile. Good everyday drinking wine with balanced characteristics.`;
        }
        return `Simple ${wineTypeName} with ${strength.label.toLowerCase()} structure. Best enjoyed chilled and consumed young.`;
    };


    const { quality_score, quality_label } = result;
    const strength = getWineStrength(alcoholLevel || 10, wineType);
    const tastingNote = getTastingNote(quality_score, alcoholLevel || 10, wineType);

    // GSAP Animation Refs
    const cardRef = useRef(null);
    const scoreRef = useRef(null);
    const labelRef = useRef(null);
    const progressRef = useRef(null);
    const strengthCardRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from(cardRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.6
            })
                .from(scoreRef.current, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                }, '-=0.3')
                .from(labelRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4
                }, '-=0.4')
                .from(progressRef.current, {
                    scaleX: 0,
                    transformOrigin: 'left',
                    duration: 1,
                    ease: 'power2.out'
                }, '-=0.3')
                .from(strengthCardRef.current, {
                    x: -50,
                    opacity: 0,
                    duration: 0.6
                }, '-=0.5');
        });

        return () => ctx.revert();
    }, [result]);


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
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}

                className={`p-6 rounded-2xl border-2 shadow-lg ${quality_label === 'Good' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700' : quality_label === 'Poor' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700' : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700'}`}
            >
                <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${quality_label === 'Good' ? 'bg-emerald-400' : quality_label === 'Poor' ? 'bg-red-400' : 'bg-amber-400'}`}>
                        <Icon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Predicted Quality</h3>
                <div
                    ref={scoreRef}
                    className="text-center text-7xl font-serif font-bold my-4 drop-shadow-2xl"
                    style={{
                        color: quality_label === 'Good' ? '#34d399' : quality_label === 'Poor' ? '#f87171' : '#fbbf24',
                        textShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }}
                >
                    {quality_score.toFixed(1)}
                </div>
                <div ref={labelRef} className="text-center text-xl font-medium mb-6 text-gray-700 dark:text-gray-200">{quality_label} Quality</div>

                <div ref={progressRef} className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                    <motion.div
                        className={`h-3 rounded-full ${quality_label === 'Good' ? 'bg-emerald-400' : quality_label === 'Poor' ? 'bg-red-400' : 'bg-amber-400'}`}
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
                ref={strengthCardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}

                className={`p-6 rounded-2xl border-2 shadow-lg ${wineType === 0 ? 'border-[#f7d1d7] dark:border-wine-800 bg-gradient-to-br from-[#fdf4f5] to-white dark:from-slate-800 dark:to-slate-900' : 'border-[#fde9c6] dark:border-amber-800 bg-gradient-to-br from-[#fef5e3] to-white dark:from-slate-800 dark:to-slate-900'}`}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg text-2xl shadow-md" style={{ backgroundColor: strength.color }}>
                        {strength.icon}
                    </div>
                    <div>
                        <div>
                            <h3 className={`text-lg font-serif font-bold ${wineType === 0 ? 'text-[#722F37] dark:text-wine-300' : 'text-[#975823] dark:text-amber-300'}`}>{strength.label}</h3>
                            <p className={`text-sm ${wineType === 0 ? 'text-[#881e3d] dark:text-wine-200' : 'text-[#975823] dark:text-amber-200'}`}>{strength.description}</p>
                        </div>
                    </div>
                </div>

                <div className={`bg-white dark:bg-slate-900 rounded-lg p-4 border ${wineType === 0 ? 'border-[#f7d1d7] dark:border-wine-800' : 'border-[#fde9c6] dark:border-amber-800'}`}>
                    <div className="flex items-start gap-2">
                        <Wine className={`h-5 w-5 flex-shrink-0 mt-0.5 ${wineType === 0 ? 'text-[#722F37] dark:text-wine-400' : 'text-[#f1a64b] dark:text-amber-400'}`} />
                        <div>
                            <h4 className={`font-semibold text-sm mb-1 ${wineType === 0 ? 'text-[#722F37] dark:text-wine-300' : 'text-[#f1a64b] dark:text-amber-300'}`}>Tasting Note</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tastingNote}</p>
                        </div>
                    </div>
                </div>

                <div className={`mt-4 bg-white dark:bg-slate-900 rounded-lg p-4 border ${wineType === 0 ? 'border-[#f7d1d7] dark:border-wine-800' : 'border-[#fde9c6] dark:border-amber-800'}`}>
                    <div className="flex items-start gap-2">
                        <TrendingUp className={`h-5 w-5 flex-shrink-0 mt-0.5 ${wineType === 0 ? 'text-[#722F37] dark:text-wine-400' : 'text-[#f1a64b] dark:text-amber-400'}`} />
                        <div>
                            <h4 className={`font-semibold text-sm mb-1 ${wineType === 0 ? 'text-[#722F37] dark:text-wine-300' : 'text-[#f1a64b] dark:text-amber-300'}`}>Food Pairing Suggestions</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{strength.pairing}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PredictionResult;
