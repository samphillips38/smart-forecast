import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import { Button, DialogContent, DialogTitle} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";

import VariableGraph from "../Content/Dashboard/Components/VariableGraphCard/VariableGraph";
import EditVariableDialog from "./EditVariableDialog/EditVariableDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedModel, variableEdited } from "../modelsReducer";

export default function VariableDialog({ variable, open, setOpen }) {
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
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>{variable.name}, {variable.symbol}</DialogTitle>
            <DialogContent style={{width: '75vw', height: '50vh'}}>
                <VariableGraph variable={variable}/>
                <Button onClick={addVariableClicked}>Edit</Button>
            </DialogContent>
            <EditVariableDialog 
            onCancelClicked={onVariableCancelled} 
            onSaveClicked={onVariableSaved} 
            open={editVariableOpen} 
            variable={variable}
            />
        </Dialog>
    );
}