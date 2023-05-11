import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, DialogTitle} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";

import VariableGraph from "../Content/Dashboard/Components/VariableGraphCard/VariableGraph";
import EditVariableDialog from "./EditVariableDialog/EditVariableDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedModel, variableDeleted, variableEdited } from "../modelsReducer";

export default function VariableDialog({ variable, open, setOpen }) {
    console.log(variable);
    const dispatch = useDispatch();
    const model = useSelector(selectSelectedModel);
    const [editVariableOpen, setEditVariableOpen] = useState(false);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const onClose = () => {
        setOpen(false);
    }
    const addVariableClicked = () => {
        setSelectedVariable(null);
        setEditVariableOpen(true);
    }
    const onVariableSaved = (variable) => {
        dispatch(variableEdited({model, variable}))
        setEditVariableOpen(false);
    }
    const onVariableCancelled = () => {
        setEditVariableOpen(false);
    }
    const onVariableDeleted = () => {
        dispatch(variableDeleted({ model, variable }))
        setEditVariableOpen(false)
    }
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between">
                    {variable.name}, {variable.symbol}
                    <Button onClick={addVariableClicked}>Edit</Button>
                </Stack>
            </DialogTitle>
            <DialogContent style={{width: '75vw'}}>
                <Stack height="100%">
                    <VariableGraph variable={variable} height={300}/>
                </Stack>
            </DialogContent>
            <EditVariableDialog 
            onCancelClicked={onVariableCancelled} 
            onSaveClicked={onVariableSaved}
            onDeleteClicked={onVariableDeleted}
            open={editVariableOpen} 
            variable={variable}
            />
        </Dialog>
    );
}