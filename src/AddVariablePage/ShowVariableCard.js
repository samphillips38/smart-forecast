import React from "react";
import EditableGraph from "./EditableGraph";
import DetVariableChart from "../charts/DetVariableChart";
import { ResponsiveContainer } from "recharts";

export default function ShowVariableCard({ variable, editedVariable, setEditedVariable, onRemoveItem }) {
  return (
    <>
        {/* <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{variable.title}, {variable.symbol}</Typography>
                <IconButton
                    aria-label="delete"
                    onClick={() => onRemoveItem(variable)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Typography variant="h6">Graphs will go here</Typography>
            <Box alignSelf="flex-end">
                <Button
                    aria-label="Edit"
                    color="inherit"
                    onClick={onEditClicked}
                >{isEditing ? "Edit Variable" : "Save Variable"}</Button>
            </Box>
        </Stack> */}
        {variable.isProb ? (
            <EditableGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
            // <RVariableChart variableData={editedVariable.data}/>
        ) : (
            <ResponsiveContainer width="99%" height={300}>
                <DetVariableChart variableData={editedVariable.data}/>
            </ResponsiveContainer>
        )}
    </>
  );
}
