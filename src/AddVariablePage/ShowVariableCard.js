import React from "react";
import EditableGraph from "./EditableGraph";
import DetVariableChart from "../charts/DetVariableChart";
import { Box } from "@material-ui/core";

export default function ShowVariableCard({ variable, editedVariable, setEditedVariable, onRemoveItem }) {
  return (
    <>
        {variable.isProb ? (
            <EditableGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
        ) : (
            <DetVariableChart variableData={editedVariable.data}/>
        )}
    </>
  );
}
