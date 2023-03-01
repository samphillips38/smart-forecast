import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { height } from "@mui/system";
import TextField from "@mui/material/TextField";

const defaultVariable = {
    'symbol': 'x',
    'title': 'thing'
}

export default function AddVariablePage({ variable, open, setOpen }) {
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