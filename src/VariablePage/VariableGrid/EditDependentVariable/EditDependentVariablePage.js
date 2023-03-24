import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import EquationView from "../EquationView";
import nerdamer from "nerdamer";

export default function EditDependentVariablePage({ variable, open, setOpen, timelineData, onSave }) {
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
    const [variableName, setVariableName] = useState(editedVariable.title)
    const [variableSymbol, setVariableSymbol] = useState(editedVariable.symbol)
    const [expression, setExpression] = useState(editedVariable.expression)
    const [symbolError, setSymbolError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [expressionError, setExpressionError] = useState("");
    const onClose = () => {
        console.log('Closed');
        setOpen(false);
    }
    const onVarNameChanged = (e) => {
        if (e.target.value == "") {
            setTitleError("Cannot be blank");
        } else {
            setVariableName(e.target.value);
            setTitleError("");
        }
    }
    const onSymbolChanged = (e) => {
        if (e.target.value == "") {
            setSymbolError("Cannot be blank");
        } else {
            setVariableSymbol(e.target.value)
            setSymbolError("");
        }
    }
    const onExpressionChange = (e) => {
        let isValidExpression = true;
        try {
            nerdamer(e.target.value)
        } catch (error) {
            isValidExpression = false;
        }
        if (e.target.value == "") {
            setExpressionError("Cannot be blank");
        } else if (!isValidExpression) {
            setExpressionError("Invalid expression")
        } else {
            setExpression(e.target.value);
            setExpressionError("");
        }
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
                                error={titleError != ""}
                                helperText={titleError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                    id={editedVariable.symbol}
                                    label="Symbol"
                                    defaultValue={editedVariable.symbol}
                                    onChange={onSymbolChanged}
                                    fullWidth
                                    error={symbolError != ""}
                                    helperText={symbolError}
                                />
                        </Grid>
                    </Grid>
                    <EquationView symbol={variableSymbol} expression={expression}/>
                    <TextField
                        id={editedVariable.symbol}
                        label="Expression"
                        defaultValue={editedVariable.expression}
                        onChange={onExpressionChange}
                        fullWidth
                        error={expressionError != ""}
                        helperText={expressionError}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onClose}>Cancel</Button>   
                        <Button onClick={() => onSave(variableName, variableSymbol, expression)}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
} + 2