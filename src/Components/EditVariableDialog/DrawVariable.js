import { Stack } from "@mui/material";

import NameTextField from "../NameTextField";
import SymbolTextField from "../SymbolTextField";
import DrawGraph from "./DrawGraph";

export default function DrawVariable({ editedVariable, setEditedVariable, otherVariables }) {
    return (
        <Stack alignItems="stretch" spacing={2}>
            <Stack direction="row" spacing={2}>
                <NameTextField
                editedVariable={editedVariable} 
                setEditedVariable={setEditedVariable}
                />
                <SymbolTextField
                editedVariable={editedVariable} 
                setEditedVariable={setEditedVariable}
                />
            </Stack>
            <DrawGraph
            editedVariable={editedVariable}
            setEditedVariable={setEditedVariable}
            />
        </Stack>
    );
}