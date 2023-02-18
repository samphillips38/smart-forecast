import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Line,
  LineChart, 
  Crosshair
} from "recharts";
import Stack from '@mui/material/Stack';
import { useState } from "react";

export default function EditableGraph({ editedVariable, setEditedVariable }) {
    const [probabilityDensityData, setProbabilityDensityData] = useState(getDistAtTime(1))
    const variableData = editedVariable.data;
    const data = variableData["time"].map((t, i) => ({
        name: t,
        mean: variableData["mean"][i],
        "std+": variableData["mean"][i] + variableData["std"][i],
        "std-": variableData["mean"][i] - variableData["std"][i]
    }));
    const [selectedTime, setSelectedTime] = useState(null);

    function getDistAtTime(t) {
        const probabilityDensityData = [];
        let minLim = 0;
        let maxLim = 0;
        let mean = 0;
        let standardDeviation = 0;
        editedVariable.data.time.forEach((t_el, i) => {
            if (t_el == t) {
                mean = editedVariable.data.mean[i];
                standardDeviation = editedVariable.data.std[i];
            }
            const lowerVal = editedVariable.data.mean[i] - 5*editedVariable.data.std[i];
            const upperVal = editedVariable.data.mean[i] + 5*editedVariable.data.std[i];
            if (lowerVal < minLim) {
                minLim = lowerVal;
            }
            if (upperVal > maxLim) {
                maxLim = upperVal;
            }
        });
        for (let i = minLim; i <= maxLim; i += (maxLim - minLim) / 100) {
            const probabilityDensity = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(0-(i - mean) ** 2 / (2 * standardDeviation ** 2));
            probabilityDensityData.push({ x: i.toFixed(2), y: probabilityDensity });
        }
        return probabilityDensityData;
    };
    const onMouseMove = (e) => {
        const toTime = e.activeTooltipIndex + 1;
        setSelectedTime(toTime);
    }
    const onMouseClick = (e) => {
        const toTime = e.activeTooltipIndex + 1;
        if (toTime != null) {
            setProbabilityDensityData(getDistAtTime(toTime));
        }
    }
    return (
            <Stack direction="row" height={300}>
                <ResponsiveContainer width="99%" height="99%">
                    <LineChart data={data} onMouseMove={onMouseMove} onClick={onMouseClick}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="std+" stroke="#ffc658" />
                        <Line type="monotone" dataKey="mean" stroke="#ff7300" />
                        <Line type="monotone" dataKey="std-" stroke="#ffc658" />
                        <ReferenceLine x={selectedTime} stroke="red" strokeWidth={2} />
                    </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="99%" height="99%">
                    <AreaChart data={probabilityDensityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                        <Line type="linear" dataKey="y" stroke="#ff7300" />
                    </AreaChart>
                    </ResponsiveContainer>
            </Stack>
      );
}