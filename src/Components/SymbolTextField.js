import { useState } from "react";
import TextField from "@mui/material/TextField";

export function SymbolTextField({ editedVariable, setEditedVariable }) {
    const [error, setError] = useState(null);
    const onSymbolChanged = (e) => {
        if (e.target.value == "") {
            setError("Cannot be blank");
        } else {
            setEditedVariable({
                ...editedVariable,
                symbol: e.target.value
            })
            setError(null);
        }
    }
    return (
        <TextField
            id={editedVariable.symbol}
            label="Symbol"
            defaultValue={editedVariable.symbol}
            onChange={onSymbolChanged}
            fullWidth
            error={error != null}
            helperText={error}
        />
    )
}