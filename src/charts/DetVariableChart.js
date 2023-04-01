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
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

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
                <Stack spacing={2} width="200px">
                    <Typography >Edit Point</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Select Date" />
                    </LocalizationProvider>
                    <TextField
                        id="Val"
                        label="Select Value"
                        defaultValue={variableData.mean[1]}
                        onChange={()=>{}}
                        fullWidth
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={onSaveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default function DetVariableChart({ variableData, width, height }) {
    const [open, setOpen] = useState(false);
    const handleClick = (event) => {
        console.log("clicked point (chart)", event.activePayload[0].payload);
        setOpen(true)
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const data = variableData.time.map((t, i) => ({
        name: t,
        mean: variableData["mean"][i]
    }));
    return (
        <>
        <ResponsiveContainer width={width} height={height}>
        <LineChart
            data={data}
            margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
            }}
            onClick={handleClick}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mean" stroke="#82ca9d"/>
        </LineChart>
        </ResponsiveContainer>
        <EditValue onClose={handleClose} open={open} variableData={variableData}/>
        </>
    );
}
