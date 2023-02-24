import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Chart({ variableData }) {
  const data = variableData["time"].map((t, i) => ({
    name: t,
    mean: variableData["mean"][i]
  }));
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
        <Line type="monotone" dataKey="mean" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
