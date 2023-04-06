import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { height } from "@mui/system";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProbSelector from "./ProbSelector";
import DeterministicSelector from "./DeterministicSelector";

import { useDispatch } from "react-redux";
import { variableAdded, variableEdited } from "../../../investmentsReducer";

function TabPanel(props) {
    const { value, editedVariable, setEditedVariable } = props;
    switch (value) {
        case 0:
            return (
                <DeterministicSelector variable={editedVariable}/>
            );
        case 1:
            return (
                <ProbSelector editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
            );
        default:
            break;
    }
};
function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'color': 'inherit',
    'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function AddVariablePage({ variable, open, setOpen }) {
    const dispatch = useDispatch();
    const defaultVariable = {
        symbol: 'x',
        title: 'New Variable',
        data: {
            time: [0, 1, 2, 3, 4],
            mean: [0, 0.5, 1.5, 2.5, 3.5],
            std: [1, 2, 3, 4, 5]
        },
        isProb: false,
        type: "Independent",
        displayOnDashboard: true
    }
    const [editedVariable, setEditedVariable] = useState(
        variable ? {...variable} : defaultVariable
    );
    const [tabIndex, setTabIndex] = useState(editedVariable.isProb ? 1 : 0);
    useEffect(() => {
        setEditedVariable(variable ? {...variable} : defaultVariable);
        setTabIndex(variable && variable.isProb ? 1 : 0)
    }, [variable])
    const onTabIndexChange = (event, newValue) => {
        setTabIndex(newValue);
        setEditedVariable({
            ...editedVariable,
            isProb: newValue == 1
        })
    }
    const onClose = () => {
        setEditedVariable(defaultVariable)
        setOpen(false);
    }
    const onSave = () => {
        if (variable != null) {
            console.log(editedVariable)
            dispatch(variableEdited(editedVariable));
        } else {
            console.log(editedVariable)
            dispatch(variableAdded(editedVariable));
        }
        onClose()
    }
    
    const onVarNameChanged = (e) => {
        setEditedVariable({
            ...editedVariable,
            title: e.target.value
        })
    }
    const onSymbolChanged = (e) => {
        setEditedVariable({
            ...editedVariable,
            symbol: e.target.value
        })
    }
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>Edit Variable</DialogTitle>
            <DialogContent style={{width: '75vw', maxHeight: '90vh'}}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={editedVariable.symbol}
                                label="Variable Name"
                                defaultValue={editedVariable.title}
                                onChange={onVarNameChanged}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={editedVariable.symbol}
                                label="Symbol"
                                defaultValue={editedVariable.symbol}
                                onChange={onSymbolChanged}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={onTabIndexChange} aria-label="basic tabs example" color="inherit">
                            <Tab label="Deterministic" {...a11yProps(0)} />
                            <Tab label="Probabilistic" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onClose}>Cancel</Button>   
                        <Button onClick={onSave}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}