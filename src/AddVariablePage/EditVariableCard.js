import TextField from "@mui/material/TextField";
import { CardContent } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";

export default function EditVariableCard({ variable, setIsEditing, onRemoveItem }) {
    const [editedVariable, setEditedVariable] = useState(variable);
    const onVarNameChanged = (e) => {
        const newValue = editedVariable;
        newValue.title = e.target.value;
        setEditedVariable(newValue);
    };
    const onSymbolChanged = (e) => {
        const newValue = editedVariable;
        newValue.symbol = e.target.value;
        setEditedVariable(newValue);
    };
    const onExpressionChanged = (e) => {
        const newValue = editedVariable;
        newValue.expression = e.target.value;
        setEditedVariable(newValue);
    };
    const onSaveClicked = () => {
        console.log("Saved");
        setIsEditing(false);
    };
    return (
        <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={2}>
                    <TextField
                        id={variable.symbol}
                        label="Name"
                        defaultValue={editedVariable.title}
                        onChange={onVarNameChanged}
                    />
                    <TextField
                        id={variable.symbol}
                        label="Symbol"
                        defaultValue={editedVariable.symbol}
                        onChange={onSymbolChanged}
                    />
                    <TextField
                        id={variable.symbol}
                        label="Expression"
                        defaultValue={editedVariable.expression}
                        onChange={onExpressionChanged}
                    />
                </Stack>
                <Stack alignItems="flex-end" justifyContent="space-between">
                    <IconButton
                        aria-label="delete"
                        onClick={() => onRemoveItem(variable)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <Button
                        aria-label="save"
                        color="inherit"
                        onClick={onSaveClicked}
                    >Save Variable</Button>
                </Stack>
            </Stack>
        </CardContent>
    );
}
