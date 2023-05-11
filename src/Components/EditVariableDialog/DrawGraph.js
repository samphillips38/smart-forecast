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
import Button from '@mui/material/Button';
// import GaussianChart from "./ExampleCharts/Gaussian";
import GaussianChart from "../../OLD/charts/ExampleCharts/Gaussian";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function EditExact({ point, setPoint }) {
    return (
        <Stack spacing={2}>
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
        </Stack>
    )
}

function EditApprox({ point, setPoint }) {
    return (
        <Stack spacing={2} direction="row" alignItems="stretch">
            <Stack spacing={2} minWidth={200} justifyContent="space-between">
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
            <GaussianChart width={300} height={250}/>
        </Stack>
    )
}


function EditValue({ onClose, open, editedVariable, setEditedVariable, i }) {
    const [point, setPoint] = useState(
        editedVariable.points.entities[i] || {}
        );
    const [isExact, setIsExact] = useState(point.yDeviation == null || point.yDeviation == undefined);
    useEffect(() => {
        setPoint(editedVariable.points.entities[i] || {})
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
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    const onExactApproxChanged = (e, newVal) => {
        setPoint({
            ...point,
            yDeviation: newVal ? 0 : null
        })
        setIsExact(newVal)
    }
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <Stack alignItems="stretch" spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                        <Typography >Edit Point</Typography>
                        <ToggleButtonGroup
                        value={isExact}
                        exclusive
                        onChange={onExactApproxChanged}
                        size="small"
                        >
                            <ToggleButton value={true}>Exact</ToggleButton>
                            <ToggleButton value={false}>Approximate</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    {isExact ? (
                        <EditExact point={point} setPoint={setPoint}/>
                    ) : (
                        <EditApprox point={point} setPoint={setPoint}/>
                    )}
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={onSaveClicked}>Save</Button>
                    </Stack>
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
