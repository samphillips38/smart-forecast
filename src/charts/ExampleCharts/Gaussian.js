import React from 'react';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

function getGaussianData() {
    const probabilityDensityData = [];
    let mean = 0;
    let standardDeviation = 3;
    for (let i = -10; i <= 10; i += 0.1) {
        const probabilityDensity = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(0-(i - mean) ** 2 / (2 * standardDeviation ** 2));
        probabilityDensityData.push({ x: i.toFixed(2), y: probabilityDensity });
    }
    return probabilityDensityData;
}

export default function GaussianChart({ width, height}) {
    const probabilityDensityData = getGaussianData()
    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={probabilityDensityData}>
                <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                <Line type="linear" dataKey="y" stroke="#ff7300" />
            </AreaChart>
        </ResponsiveContainer>
    );
}