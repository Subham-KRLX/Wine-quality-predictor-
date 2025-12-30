import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const FeatureImportanceChart = ({ wineType }) => {
    const [data, setData] = useState([]);
    const color = wineType === 0 ? '#722F37' : '#f1a64b';
    const bgColor = wineType === 0 ? '#fdf4f5' : '#fef5e3';
    const borderColor = wineType === 0 ? '#f7d1d7' : '#fde9c6';
    const textColor = wineType === 0 ? '#881e3d' : '#975823';

    useEffect(() => {
        fetch('http://localhost:8000/feature-importance')
            .then(res => res.json())
            .then(data => {
                const formattedData = Object.entries(data)
                    .map(([name, value]) => ({
                        name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        value: (value * 100).toFixed(1)
                    }))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 5);
                setData(formattedData);
            })
            .catch(err => console.error("Failed to fetch feature importance", err));
    }, []);

    if (data.length === 0) return null;

    return (
        <div

            className={`p-6 rounded-2xl border-2 shadow-lg ${wineType === 0 ? 'border-[#f7d1d7] dark:border-wine-800 bg-gradient-to-br from-[#fdf4f5] to-white dark:from-slate-800 dark:to-slate-900' : 'border-[#fde9c6] dark:border-amber-800 bg-gradient-to-br from-[#fef5e3] to-white dark:from-slate-800 dark:to-slate-900'}`}
        >
            <div className="flex items-center gap-2 mb-5">
                <TrendingUp className={`h-5 w-5 ${wineType === 0 ? 'text-[#722F37] dark:text-wine-400' : 'text-[#f1a64b] dark:text-amber-400'}`} />
                <h3 className={`text-lg font-serif font-bold ${wineType === 0 ? 'text-[#881e3d] dark:text-wine-300' : 'text-[#975823] dark:text-amber-300'}`}>
                    Key Quality Factors
                </h3>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#475569' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: `2px solid ${color}`,
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                            formatter={(value) => [`${value}%`, 'Importance']}
                        />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 0 ? color : '#94a3b8'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center italic">
                Features with the highest impact on quality prediction
            </p>
        </div>
    );
};

export default FeatureImportanceChart;
