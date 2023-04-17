import { useState } from "react";
import TextField from "@mui/material/TextField";
import nerdamer from "nerdamer";

export function FormulaTextField({ editedVariable, setEditedVariable }) {
    const [error, setError] = useState(null);
    const onExpressionChanged = (e) => {
        let isValidExpression = true;
        try {
            nerdamer(e.target.value)
        } catch (error) {
            isValidExpression = false;
        }
        if (e.target.value == "") {
            setError("Cannot be blank");
        } else if (!isValidExpression) {
            setError("Invalid expression")
        } else {
            setEditedVariable({
                ...editedVariable,
                expression: e.target.value
            })
            setError(null);
        }
    }
    return (
        <TextField
            id={editedVariable.symbol}
            label="Expression"
            defaultValue={editedVariable.expression}
            onChange={onExpressionChanged}
            fullWidth
            error={error != null}
            helperText={error}
        />
    )
}