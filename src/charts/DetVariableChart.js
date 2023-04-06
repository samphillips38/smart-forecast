import React, { useState, useEffect } from "react";
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

function EditValue({ onClose, open, editedVariable, setEditedVariable, i }) {
    const [mean, setMean] = useState(editedVariable.data.mean[i]);
    const [time, setTime] = useState(editedVariable.data.time[i]);
    useEffect(() => {
        setMean(editedVariable.data.mean[i]);
        setTime(editedVariable.data.time[i]);
    }, [i])
    const onSaveClicked = () => {
        setEditedVariable({
            ...editedVariable,
            data: {
                time: editedVariable.data.time.map((el, index) => (index == i) ? time : el),
                mean: editedVariable.data.mean.map((el, index) => (index == i) ? parseFloat(mean) : el)
            }
        })
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
                        defaultValue={editedVariable.data.mean[i]}
                        onChange={(e) => setMean(e.target.value)}
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

export default function DetVariableChart({ editedVariable, setEditedVariable, width, height }) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (event) => {
        if (setEditedVariable){
            setSelectedIndex(event.activeTooltipIndex);
            setOpen(true)
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const data = editedVariable.data.time.map((t, i) => ({
        name: t,
        mean: editedVariable.data.mean[i]
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
        <EditValue 
        onClose={handleClose} 
        open={open} 
        editedVariable={editedVariable}
        setEditedVariable={setEditedVariable}
        i={selectedIndex}
        />
        </>
    );
}
