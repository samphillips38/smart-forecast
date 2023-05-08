import { useState } from "react";
import TextField from "@mui/material/TextField";
import nerdamer from "nerdamer";

export default function FormulaTextField({ editedVariable, setEditedVariable }) {
    const [error, setError] = useState(null);
    const onFormulaChanged = (e) => {
        let isValidFormula = true;
        try {
            nerdamer(e.target.value)
        } catch (error) {
            isValidFormula = false;
        }
        if (e.target.value == "") {
            setError("Cannot be blank");
        } else if (!isValidFormula) {
            setError("Invalid formula")
        } else {
            setEditedVariable({
                ...editedVariable,
                formula: e.target.value
            })
            setError(null);
        }
    }
    return (
        <TextField
            id={editedVariable.symbol}
            label="Formula"
            defaultValue={editedVariable.formula}
            onChange={onFormulaChanged}
            fullWidth
            error={error != null}
            helperText={error}
        />
    )
}