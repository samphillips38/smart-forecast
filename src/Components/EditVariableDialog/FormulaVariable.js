import { useDispatch, useSelector } from "react-redux";
import { Typography, DialogContent, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import nerdamer from "nerdamer";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { getNewVariable } from "../../Utility";
import { variableEdited, variableAdded, selectModelById } from "../../modelsReducer";
import NameTextField from "../NameTextField";
import SymbolTextField from "../SymbolTextField";
import FormulaTextField from "../FormulaTextField";
import { getNextVariableId } from "../../Utility";

export default function FormulaVariable({ editedVariable, setEditedVariable, otherVariables }) {
    const [isDetailView, setIsDetailView] = useState(false);
    const onVariableClicked = (symbol) => {
        const newFormula = (editedVariable.formula ? editedVariable.formula : "") + symbol
        setEditedVariable({
            ...editedVariable,
            formula: newFormula
        })
    }
    return (

        <Stack spacing={2} direction="row">
            <Stack spacing={2} justifyContent="space-between">
                <NameTextField
                editedVariable={editedVariable} 
                setEditedVariable={setEditedVariable}
                />
                <SymbolTextField
                editedVariable={editedVariable} 
                setEditedVariable={setEditedVariable}
                />
                <FormulaTextField
                editedVariable={editedVariable} 
                setEditedVariable={setEditedVariable}
                />
            </Stack>
            <Button
            variant="outlined"
            color="inherit"
            style={{width: '20px'}}
            onClick={() => setIsDetailView(!isDetailView)}
            >{isDetailView ? "<" : ">"}</Button>

            {isDetailView && (
                <Stack alignItems="flex-start" spacing={2} justifyContent="stretch">
                    <Typography>Variables</Typography>
                    <Grid container wrap="wrap" spacing={1}>
                        {otherVariables && otherVariables.map((variable) => (
                            <Grid item key-={variable.id}>
                                <Button variant="outlined" onClick={() => onVariableClicked(variable.symbol)}>{variable.symbol}</Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography>Operations</Typography>
                    <Grid container wrap="wrap" spacing={1}>
                        {['+', '-', '*', '/'].map((operation) => (
                            <Grid item key-={operation}>
                                <Button variant="outlined" onClick={() => onVariableClicked(operation)}>{operation}</Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Button>Advanced</Button>
                </Stack>
            )}
        </Stack>
    )
}