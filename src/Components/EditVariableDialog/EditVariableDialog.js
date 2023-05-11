import { Typography, DialogContent } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import nerdamer from "nerdamer";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { getNewVariable } from "../../Utility";
import FormulaVariable from "./FormulaVariable";

export default function EditVariableDialog({ onCancelClicked, onSaveClicked, open, variable, otherVariables }) {
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
    const onFormulaDrawChanged = (e, newVal) => {
        setEditedVariable({
            ...editedVariable,
            isFormula: newVal
        })
    }
    return (
        <Dialog onClose={onCancelClicked} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked(editedVariable)}}>
            <DialogContent>
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography >{variable ? "Edit Variable" : "Add Variable"}</Typography>
                        <ToggleButtonGroup
                        value={editedVariable.isFormula}
                        exclusive
                        onChange={onFormulaDrawChanged}
                        size="small"
                        >
                            <ToggleButton value={true}>Formula</ToggleButton>
                            <ToggleButton value={false}>Draw</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    {editedVariable.isFormula ? (
                        <FormulaVariable 
                        editedVariable={editedVariable} 
                        setEditedVariable={setEditedVariable} 
                        otherVariables={otherVariables}
                        />
                    ) : (
                        <></>
                    )}
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={saveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}