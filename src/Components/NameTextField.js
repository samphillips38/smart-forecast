import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function NameTextField({ editedVariable, setEditedVariable, ...props }) {
    const [nameError, setNameError] = useState(null);
    const onVarNameChanged = (e) => {
        if (e.target.value == "") {
            setNameError("Cannot be blank");
        } else {
            setEditedVariable({
                ...editedVariable,
                name: e.target.value
            })
            setNameError(null);
        }
    }
    return (
        <TextField
            id="name"
            label="Variable Name"
            defaultValue={editedVariable.name}
            onChange={onVarNameChanged}
            fullWidth
            error={nameError != null}
            helperText={nameError}
            {...props}
        />
    )
}