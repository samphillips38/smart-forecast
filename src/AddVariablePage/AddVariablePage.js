import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import AddVariableCard from "./AddVariableCard";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import ConstantsGrid from "./ConstantsGrid/ConstantsGrid";
import VariableGrid from "./VariableGrid/VariableGrid";

export default function AddVariablePage({ data, setData }) {
    const onRemoveItem = (variable) => {
        console.log('Deleted');
        console.log(variable.symbol);
    };
    return (
        <Stack spacing={2} >
            <Typography variant="h5">Constants</Typography>
            <Divider/>
            <ConstantsGrid data={data} setData={setData}></ConstantsGrid>
            <Typography variant="h5">Independent Variables</Typography>
            <Divider/>
            <VariableGrid data={data} setData={setData} isDependent={false}/>
            <Typography variant="h5">Dependent Variables</Typography>
            <Divider/>
            <VariableGrid data={data} setData={setData} isDependent={true}/>
            <AddVariableCard data={data} setData={setData}/>
        </Stack>
    );
}