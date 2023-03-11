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
import { Grid, CardContent } from "@material-ui/core";

export default function EditableGraph({ editedVariable, setEditedVariable }) {
    
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={editedVariable.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="std+" stroke="#ffc658" />
                        <Line type="monotone" dataKey="mean" stroke="#ff7300" />
                        <Line type="monotone" dataKey="std-" stroke="#ffc658" />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={editedVariable.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                        <Line type="linear" dataKey="y" stroke="#ff7300" />
                    </AreaChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
      );
}