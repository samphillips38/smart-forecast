import React from "react";
import DoubleGraph from "./DoubleGraph";
import DetVariableChart from "../../charts/DetVariableChart";

export default function ShowVariableCard({ variable, editedVariable, setEditedVariable, onRemoveItem }) {
  return (
    <>
        {variable.isProb ? (
            <DoubleGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
        ) : (
            <DetVariableChart variableData={editedVariable.data} width="100%" height={350}/>
        )}
    </>
  );
}
