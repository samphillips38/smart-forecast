import { makeStyles } from "@material-ui/core/styles";
import OperatorBar from "./OperatorsBar";
import VariableBar from "./VariablesBar";
import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import VariableCard from "./VariableCard";
import AddVariableCard from "./AddVariableCard";

export default function AddVariablePage({ data, setData }) {
    const onRemoveItem = (variable) => {
        console.log('Deleted');
        console.log(variable.symbol);
    };
    return (
        <Stack spacing={2}>
            <OperatorBar/>
            <VariableBar/>
            {Object.entries(data).map(([key, value]) => (
                <VariableCard
                    variable={value}
                    onRemoveItem={onRemoveItem}
                />
            ))}
            <AddVariableCard data={data} setData={setData}/>
        </Stack>
    );
}