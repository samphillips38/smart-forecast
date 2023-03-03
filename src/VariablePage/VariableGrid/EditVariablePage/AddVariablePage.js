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
import Timeline from "../../Timeline/Timeline";

const defaultVariable = {
    'symbol': 'x',
    'title': 'thing'
}

function TabPanel(props) {
    const { value, variable } = props;
    switch (value) {
        case 0:
            return (
                <DeterministicSelector variable={variable} />
            );
        case 1:
            return (
                <ProbSelector variable={variable} />
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
    const [editedVariable, setEditedVariable] = useState(
        variable || defaultVariable
    );
    const [tabIndex, setTabIndex] = useState(0);
    const onTabIndexChange = (event, newValue) => {
        setTabIndex(newValue);
    }
    const onClose = () => {
        console.log('Closed');
        setOpen(false);
    }
    const onVarNameChanged = () => {

    }
    const onSymbolChanged = () => {

    }
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>Edit Variable</DialogTitle>
            <DialogContent style={{width: '60vw', height: '90vh'}}>
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
                    <Typography variant="h6">Timeline</Typography>
                    <Timeline/>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={onTabIndexChange} aria-label="basic tabs example" color="inherit">
                            <Tab label="Deterministic" {...a11yProps(0)} />
                            <Tab label="Probabilistic" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex}/>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={1}>
                            <Button onClick={onClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={onClose}>Save</Button>
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}