import React from "react";
import EditableGraph from "./EditableGraph";
import DetVariableChart from "../../charts/DetVariableChart";

export default function ShowVariableCard({ variable, editedVariable, setEditedVariable, onRemoveItem }) {
  return (
    <>
        {variable.isProb ? (
            <EditableGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
        ) : (
            <DetVariableChart variableData={editedVariable.data} width="100%" height={350}/>
        )}
    </>
  );
}
