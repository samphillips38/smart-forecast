import React from 'react';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

function getData() {
    const probabilityDensityData = [];
    let min = -5;
    let max = 5;
    let top = 2;
    let TopValue = 2 / (max - min);
    
    for (let i = min; i <= max; i += 0.1) {
        const probabilityDensity = i < top ? TopValue * (i - min) / (top - min) : TopValue * (max - i) / (max - top);
        probabilityDensityData.push({ x: i.toFixed(2), y: probabilityDensity });
    }
    return probabilityDensityData;
}

export default function TriangleChart({ width, height}) {
    const probabilityDensityData = getData()
    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={probabilityDensityData}>
                <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                <Line type="linear" dataKey="y" stroke="#ff7300" />
            </AreaChart>
        </ResponsiveContainer>
    );
}