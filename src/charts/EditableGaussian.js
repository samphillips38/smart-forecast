import React, { useEffect, useState } from "react";
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
import GaussianChart from "./ExampleCharts/Gaussian";

function EditValue({ onClose, open, editedVariable, setEditedVariable, i }) {
    const [mean, setMean] = useState(editedVariable.data.mean[i]);
    const [stDev, setStDev] = useState(editedVariable.data.std[i]);
    const [time, setTime] = useState(editedVariable.data.time[i]);
    useEffect(() => {
        setMean(editedVariable.data.mean[i]);
        setStDev(editedVariable.data.std[i]);
        setTime(editedVariable.data.time[i]);
    }, [i])
    const onSaveClicked = () => {
        setEditedVariable({
            ...editedVariable,
            data: {
                time: editedVariable.data.time.map((el, index) => (index == i) ? time : el),
                mean: editedVariable.data.mean.map((el, index) => (index == i) ? parseFloat(mean) : el),
                std: editedVariable.data.std.map((el, index) => (index == i) ? parseFloat(stDev) : el)
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
                <Stack spacing={2} direction="row">
                    <Stack spacing={2} width="200px">
                        <Typography >Edit Point</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Select Date" />
                        </LocalizationProvider>
                        <TextField
                            id="mean"
                            label="Select Mean"
                            defaultValue={mean}
                            onChange={(e) => setMean(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="std"
                            label="Select Standard Deviation"
                            defaultValue={stDev}
                            onChange={(e) => setStDev(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                    <GaussianChart width={350} height={250}/>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={onCancelClicked}>Cancel</Button>
                    <Button onClick={onSaveClicked}>Save</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default function EditableGaussian({ editedVariable, setEditedVariable }) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (event) => {
        setSelectedIndex(event.activeTooltipIndex)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const formattedData = editedVariable.data.time.map((t, i) => ({
        name: t,
        mean: editedVariable.data.mean[i],
        'std+': (editedVariable.data.std && i < editedVariable.data.std.length) ? editedVariable.data.mean[i] + editedVariable.data.std[i] : null,
        'std-': (editedVariable.data.std && i < editedVariable.data.std.length) ? editedVariable.data.mean[i] - editedVariable.data.std[i] : null
    }));
    return (
        <>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData} onClick={handleClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" height={20}/>
                <YAxis width={30}/>
                <Tooltip />
                <Line type="monotone" dataKey="std+" stroke="#ffc658" />
                <Line type="monotone" dataKey="mean" stroke="#ff7300" />
                <Line type="monotone" dataKey="std-" stroke="#ffc658" />
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
