import { useDispatch } from "react-redux";
import { Typography, DialogContent } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";

import { getNewVariable } from "../../Utility";
import { variableEdited, variableAdded } from "../../modelsReducer";
import NameTextField from "../NameTextField";
import SymbolTextField from "../SymbolTextField";
import FormulaTextField from "../FormulaTextField";

export default function EditVariableDialog({ onClose, open, variable }) {
    const dispatch = useDispatch();
    const [editedVariable, setEditedVariable] = useState(variable ? {...variable} : getNewVariable());
    const onSaveClicked = () => {
        if (editedVariable.id) {
            dispatch(variableEdited(editedVariable))
        } else {
            dispatch(variableAdded(editedVariable))
        }
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked()}}>
            <DialogContent>
                <Stack spacing={2}>
                    <Typography >{variable ? "Edit Variable" : "Add Variable"}</Typography>
                    <Stack spacing={2} direction="row">
                        <Stack spacing={2}>
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
                        >{">"}</Button>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={onSaveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}