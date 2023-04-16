import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import EquationView from "../EquationView";
import { useDispatch } from "react-redux";

import { TitleTextField, SymbolTextField, ExpressionTextField } from "../EditVariableComponents";
import { variableEdited, variableAdded } from "../../../investmentsReducer";

export default function EditDependentVariablePage({ variable, open, setOpen }) {
    const dispatch = useDispatch();
    const defaultVariable = {
        symbol: 'x',
        title: 'New Variable',
        data: {
            mean: [0, 0.5, 1.5, 2.5, 3.5],
            std: [1, 2, 3, 4, 5]
        },
        type: "Dependent",
        displayOnDashboard: true
    }
    const [editedVariable, setEditedVariable] = useState(
        variable ? {...variable} : defaultVariable
    );
    const onSave = () => {
        if (variable != null) {
            dispatch(variableEdited(editedVariable));
        } else {
            dispatch(variableAdded(editedVariable));
        }
        onClose()
    }
    const onClose = () => {
        setOpen(false);
    }
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>Edit Variable</DialogTitle>
            <DialogContent style={{width: '75vw', maxHeight: '90vh'}}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TitleTextField
                            editedVariable={editedVariable}
                            setEditedVariable={setEditedVariable}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SymbolTextField
                            editedVariable={editedVariable}
                            setEditedVariable={setEditedVariable}
                            />
                        </Grid>
                    </Grid>
                    <EquationView symbol={editedVariable.symbol} expression={editedVariable.expression}/>
                    <ExpressionTextField
                    editedVariable={editedVariable}
                    setEditedVariable={setEditedVariable}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onClose}>Cancel</Button>   
                        <Button onClick={onSave}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
} + 2