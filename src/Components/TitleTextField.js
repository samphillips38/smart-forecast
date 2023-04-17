import { useState } from "react";
import TextField from "@mui/material/TextField";

export function TitleTextField({ editedVariable, setEditedVariable }) {
    const [titleError, setTitleError] = useState(null);
    const onVarNameChanged = (e) => {
        if (e.target.value == "") {
            setTitleError("Cannot be blank");
        } else {
            setEditedVariable({
                ...editedVariable,
                title: e.target.value
            })
            setTitleError(null);
        }
    }
    return (
        <TextField
            id={editedVariable.symbol}
            label="Variable Name"
            defaultValue={editedVariable.title}
            onChange={onVarNameChanged}
            fullWidth
            error={titleError != null}
            helperText={titleError}
        />
    )
}