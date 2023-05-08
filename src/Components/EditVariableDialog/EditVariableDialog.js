import { useDispatch } from "react-redux";
import { Typography, DialogContent } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import nerdamer from "nerdamer";

import { getNewVariable } from "../../Utility";
import { variableEdited, variableAdded } from "../../modelsReducer";
import NameTextField from "../NameTextField";
import SymbolTextField from "../SymbolTextField";
import FormulaTextField from "../FormulaTextField";
import { getNextVariableId } from "../../Utility";

export default function EditVariableDialog({ onCancelClicked, onSaveClicked, open, variable }) {
    const [editedVariable, setEditedVariable] = useState(variable ? variable : getNewVariable());
    useEffect(() => {
        setEditedVariable(variable ? variable : getNewVariable());
    }, [open])
    const saveClicked = () => {
        const expression = nerdamer(editedVariable.formula);
        const variable = {
            ...editedVariable,
            dependencies: expression.variables()
        }
        onSaveClicked(variable);
    }

    return (
        <Dialog onClose={onCancelClicked} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked(editedVariable)}}>
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
                        <Button onClick={saveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}