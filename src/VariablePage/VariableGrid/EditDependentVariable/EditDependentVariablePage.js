import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import EquationView from "../EquationView";

export default function EditDependentVariablePage({ variable, open, setOpen, timelineData }) {
    const defaultVariable = {
        symbol: 'x',
        title: 'New Variable',
        data: {
            time: timelineData,
            mean: [0, 0.5, 1.5, 2.5, 3.5],
            std: [1, 2, 3, 4, 5]
        }
    }
    const [editedVariable, setEditedVariable] = useState(
        variable || defaultVariable
    );
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
                    <EquationView variable={variable}/>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onClose}>Cancel</Button>   
                        <Button onClick={onClose}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}