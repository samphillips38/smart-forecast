import { useState } from "react";
import TextField from "@mui/material/TextField";
import nerdamer from "nerdamer";

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

export function ExpressionTextField({ editedVariable, setEditedVariable }) {
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