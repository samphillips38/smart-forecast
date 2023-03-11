import React, { useState } from "react";
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
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import TriangleChart from "./ExampleCharts/Triangle";


function EditValue({ onClose, open, variableData }) {
    const onSaveClicked = () => {
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <Stack spacing={2} direction="row">
                    <Stack spacing={2} width="200px">
                        <Typography >Edit Point</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Select Date" />
                        </LocalizationProvider>
                        <TextField
                            id="peak"
                            label="Select Peak"
                            defaultValue={variableData.mean[1]}
                            onChange={()=>{}}
                            fullWidth
                        />
                        <TextField
                            id="ub"
                            label="Select Upper Bound"
                            defaultValue={variableData.max ? variableData.max[1] : 0}
                            onChange={()=>{}}
                            fullWidth
                        />
                        <TextField
                            id="lb"
                            label="Select Lower Bound"
                            defaultValue={variableData.min ? variableData.min[1] : 0}
                            onChange={()=>{}}
                            fullWidth
                        />
                    </Stack>
                    <TriangleChart width={350} height={250}/>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={onCancelClicked}>Cancel</Button>
                    <Button onClick={onSaveClicked}>Save</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default function EditableTriangular({ variableData }) {
    const [open, setOpen] = useState(false);
    const handleClick = (event) => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const data = variableData["time"].map((t, i) => ({
        name: t,
        mean: variableData.mean[i],
        max: (variableData.max && i < variableData.max.length) ? variableData.max[i] : null,
        max: (variableData.min && i < variableData.min.length) ? variableData.max[i] : null,
    }));
    return (
        <>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} onClick={handleClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="max+" stroke="#ffc658" />
                <Line type="monotone" dataKey="mean" stroke="#ff7300" />
                <Line type="monotone" dataKey="min" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
        <EditValue onClose={handleClose} open={open} variableData={variableData}/>
        </>
    );
}
