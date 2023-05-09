import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function VariableGraph({ variable }) {
    const data = Object.values(variable.points.entities).map((point) => ({
        name: point.xCoordinate,
        mean: point.yCoordinate,
    }));
//   const data = variableData["time"].map((t, i) => ({
//     name: (new Date(t)).toDateString(),
//     mean: variableData["mean"][i],
//     "std+": variableData["mean"][i] + variableData["std"][i],
//     "std-": variableData["mean"][i] - variableData["std"][i]
//   }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: -12,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="mean"
          stackId="2"
          stroke="#82ca9d"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="std+"
          stackId="3"
          stroke="#ffc658"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="std-"
          stackId="1"
          stroke="#ffc658"
          fill=""
          fillOpacity="0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
