import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Sparkles, TrendingUp, ArrowRight, Award, Shield, BarChart3 } from 'lucide-react';

const HomePage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen dark:bg-slate-950 transition-colors duration-300" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Hero Section with Wine → Amber Gradient */}
            <div className="relative overflow-hidden text-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800" style={{ background: 'linear-gradient(135deg, #722F37 0%, #f1a64b 100%)' }}>
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-wine-700 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Decorative wine glass pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 60 L35 45 L25 30 L55 30 L45 45 Z M38 60 L42 60 L42 70 L38 70 Z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        {/* Logo/Icon */}
                        <div className="flex justify-center mb-10">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="relative cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-amber-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                                <div className="relative glass-dark p-8 rounded-full border-2 border-white/30 shadow-2xl">
                                    <Wine className="h-20 w-20 text-amber-300" strokeWidth={1.5} />
                                </div>
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-6xl sm:text-8xl font-serif font-bold mb-6 text-white drop-shadow-2xl tracking-tight"
                        >
                            VinoPredict
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <p className="text-2xl sm:text-3xl text-amber-100 mb-4 font-light tracking-wide">
                                AI-Powered Wine Quality Analysis
                            </p>
                            <p className="text-lg sm:text-xl text-white/90 mb-14 max-w-3xl mx-auto leading-relaxed">
                                Unlock the secrets of wine quality using advanced machine learning.
                                Get instant predictions, expert insights, and personalized tasting recommendations.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(241, 166, 75, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onGetStarted}
                                className="group px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-wine-900 rounded-full font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all"
                            >
                                <Sparkles className="h-6 w-6" />
                                Start Free Analysis
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 glass-dark hover:bg-white/20 rounded-full font-semibold text-lg border-2 border-white/40 transition-all flex items-center justify-center gap-2"
                            >
                                <BarChart3 className="h-5 w-5" />
                                View Demo
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Elegant wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto dark:hidden">
                        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#F5F5F5" />
                    </svg>
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto hidden dark:block">
                        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#0f172a" />
                    </svg>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-28 dark:bg-slate-900 transition-colors duration-300" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl sm:text-6xl font-serif font-bold dark:text-white text-wine-900 mb-6">
                            Why Choose VinoPredict?
                        </h2>
                        <p className="text-xl dark:text-gray-300 text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Combining centuries of wine expertise with cutting-edge artificial intelligence
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Advanced AI Technology',
                                description: 'Our Random Forest model analyzes 12 chemical properties trained on 6,497 wine samples for precise quality predictions',
                                color: 'wine'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Detailed Insights',
                                description: 'Get comprehensive breakdowns of quality factors, wine strength classification, and feature importance analysis',
                                color: 'amber'
                            },
                            {
                                icon: Award,
                                title: 'Expert Recommendations',
                                description: 'Receive professional tasting notes, food pairing suggestions, and serving recommendations for every wine',
                                color: 'wine'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group relative"
                            >
                                {/* Hover glow effect */}
                                <div className={`absolute inset-0 bg-${feature.color === 'wine' ? 'wine' : 'amber'}-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl blur-2xl -z-10`}></div>

                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl border-2 dark:border-slate-700 border-gray-100 hover:border-wine-200 dark:hover:border-amber-400 hover:shadow-2xl transition-all h-full">
                                    <div className={`inline-flex p-5 rounded-2xl mb-6 shadow-lg`} style={{ background: feature.color === 'wine' ? 'linear-gradient(135deg, #722F37 0%, #B31329 100%)' : 'linear-gradient(135deg, #f1a64b 0%, #e28a2f 100%)' }}>
                                        <feature.icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold dark:text-white text-wine-900 mb-4">{feature.title}</h3>
                                    <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-base">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-24" style={{ background: 'linear-gradient(135deg, #722F37 0%, #f1a64b 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 text-center">
                        {[
                            { number: '6,497', label: 'Wine Samples' },
                            { number: '43.4%', label: 'Model R² Score' },
                            { number: '12+', label: 'Parameters' },
                            { number: '100%', label: 'Accuracy Goal' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                                className="glass-dark p-8 rounded-2xl"
                            >
                                <div className="text-5xl sm:text-6xl font-serif font-bold text-amber-300 mb-3">
                                    {stat.number}
                                </div>
                                <div className="text-white/90 font-medium text-lg">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 text-white bg-wine-900 py-28">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex p-6 bg-amber-500/20 rounded-full mb-8 border-2 border-amber-400/30">
                            <Shield className="h-16 w-16 text-amber-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
                            Ready to Elevate Your Wine Experience?
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join wine enthusiasts and professionals leveraging AI for precise quality analysis
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onGetStarted}
                            className="px-12 py-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-wine-900 rounded-full font-bold text-xl shadow-2xl transition-all inline-flex items-center gap-3"
                        >
                            <Wine className="h-6 w-6" />
                            Begin Your Analysis
                            <ArrowRight className="h-5 w-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="dark:bg-slate-950 dark:border-slate-700 dark:text-white/50 bg-wine-950 text-white/60 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex justify-center items-center gap-3 mb-4 cursor-pointer dark:hover:text-white/80 hover:opacity-80 transition-opacity"
                    >
                        <Wine className="h-6 w-6 text-amber-400" />
                        <span className="font-serif font-semibold text-xl dark:text-white text-white">VinoPredict</span>
                    </div>
                    <p className="text-sm mb-2">Premium AI-Powered Wine Quality Assessment</p>
                    <p className="text-xs">&copy; {new Date().getFullYear()} VinoPredict. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
