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
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
// import GaussianChart from "./ExampleCharts/Gaussian";
import GaussianChart from "../../OLD/charts/ExampleCharts/Gaussian";

function EditValue({ onClose, open, editedVariable, setEditedVariable, i }) {
    const [point, setPoint] = useState(
        editedVariable.points.entities[i] || {}
        );
    useEffect(() => {
        setPoint(editedVariable.points.entities[i])
    }, [i])
    const onSaveClicked = () => {
        setEditedVariable({
            ...editedVariable,
            points: {
                ...editedVariable.points,
                entities: {
                    ...editedVariable.points.entities,
                    [i]: point
                }
            }
    })
        // setEditedVariable({
        //     ...editedVariable,
        //     data: {
        //         time: editedVariable.data.time.map((el, index) => (index == i) ? time : el),
        //         mean: editedVariable.data.mean.map((el, index) => (index == i) ? parseFloat(mean) : el),
        //         std: editedVariable.data.std.map((el, index) => (index == i) ? parseFloat(stDev) : el)
        //     }
        // })
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
                        <TextField
                            id="x"
                            label="Select X Coordinate"
                            defaultValue={point ? point.yCoordinate : null}
                            onChange={(e) => setPoint({...point, xCoordinate: parseFloat(e.target.value)})}
                            fullWidth
                        />
                        <TextField
                            id="mean"
                            label="Select Y Coordinate"
                            defaultValue={point ? point.yCoordinate : null}
                            onChange={(e) => setPoint({...point, yCoordinate: parseFloat(e.target.value)})}
                            fullWidth
                        />
                        <TextField
                            id="std"
                            label="Select Y Deviation"
                            defaultValue={point ? point.yDeviation : null}
                            onChange={(e) => setPoint({...point, yDeviation: parseFloat(e.target.value)})}
                            fullWidth
                        />
                    </Stack>
                    <GaussianChart width="100%" height={250}/>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={onCancelClicked}>Cancel</Button>
                    <Button onClick={onSaveClicked}>Save</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default function DrawGraph({ editedVariable, setEditedVariable }) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleClick = (event) => {
        if (event) {
            setSelectedIndex(event.activeTooltipIndex);
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const addVariableClicked = () => {
        setSelectedIndex(Object.values(editedVariable.points.entities).length)
        setOpen(true)
    }
    const formattedData = Object.values(editedVariable.points.entities).map((point, i) => ({
        name: point.xCoordinate,
        mean: point.yCoordinate,
        'std+': point.yDeviation != undefined ? point.yCoordinate + point.yDeviation : null,
        'std-': point.yDeviation != undefined ? point.yCoordinate - point.yDeviation : null,
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
        <Button
        fullWidth
        variant="outlined"
        onClick={addVariableClicked}
        >Add Point</Button>
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
