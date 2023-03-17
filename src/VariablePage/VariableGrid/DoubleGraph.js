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
import { Grid, CardContent } from "@material-ui/core";

export default function DoubleGraph({ editedVariable, setEditedVariable }) {
    const [probabilityDensityData, setProbabilityDensityData] = useState(getDistAtTime(1))
    const variableData = editedVariable.data;
    const data = variableData["time"].map((t, i) => ({
        name: t,
        mean: variableData["mean"][i],
        "std+": variableData["mean"][i] + variableData["std"][i],
        "std-": variableData["mean"][i] - variableData["std"][i]
    }));
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

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
        for (let i = minLim; i <= maxLim; i += (maxLim - minLim) / 200) {
            const probabilityDensity = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(0-(i - mean) ** 2 / (2 * standardDeviation ** 2));
            probabilityDensityData.push({ x: i.toFixed(2), y: probabilityDensity });
        }
        return probabilityDensityData;
    };
    const onMouseMove = (e) => {
        // setSelectedTimeIndex(e.activeTooltipIndex);
    }
    const onMouseClick = (e) => {
        setSelectedTimeIndex(e.activeTooltipIndex);
        const toTime = editedVariable.data.time[e.activeTooltipIndex];
        if (toTime != null) {
            setProbabilityDensityData(getDistAtTime(toTime));
        }
    }
    const [isDraggingVariance, setIsDraggingVariance] = useState(false);
    const [selectedXIndex, setSelectedXIndex] = useState(null);
    const [initStd, setInitStd] = useState(null);
    const onProbMouseUp = (e) => {
        setIsDraggingVariance(false);
    }
    const onProbMouseDown = (e) => {
        const { chartX, chartY } = e;
        console.log(chartX);
        console.log(probabilityDensityData);
        setSelectedXIndex(chartX);
        setInitStd(editedVariable.data.std[selectedTimeIndex]);
        setIsDraggingVariance(true);
    }
    const onProbMouseMove = (e) => {
        if (isDraggingVariance) {
            const { chartX, chartY } = e;
            console.log(chartX);
            console.log(selectedXIndex);
            let updatedVariable = editedVariable;
            let newStd = initStd + probabilityDensityData[chartX].x - probabilityDensityData[selectedXIndex].x;
            updatedVariable.data.std[selectedTimeIndex] = newStd;
            setEditedVariable(updatedVariable);
            setProbabilityDensityData(getDistAtTime(updatedVariable.data.time[selectedTimeIndex]));
        }
    }
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} onMouseMove={onMouseMove} onClick={onMouseClick}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={15}/>
                        <YAxis width={30}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="std+" stroke="#ffc658" />
                        <Line type="monotone" dataKey="mean" stroke="#ff7300" />
                        <Line type="monotone" dataKey="std-" stroke="#ffc658" />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={probabilityDensityData} onMouseDown={onProbMouseDown} onMouseUp={onProbMouseUp} onMouseMove={onProbMouseMove}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" height={15}/>
                        <YAxis width={30}/>
                        <Tooltip />
                        <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                        <Line type="linear" dataKey="y" stroke="#ff7300" />
                    </AreaChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
      );
}