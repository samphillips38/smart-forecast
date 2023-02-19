import { makeStyles } from "@material-ui/core/styles";
import OperatorBar from "./OperatorsBar";
import VariableBar from "./VariablesBar";
import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import VariableCard from "./VariableCard";
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
        <Stack spacing={2}>
            <Typography h4>Constants</Typography>
            <Divider/>
            <ConstantsGrid data={data} setData={setData}></ConstantsGrid>
            <Typography h4>Independent Variables</Typography>
            <Divider/>
            <VariableGrid data={data} setData={setData} isDependent={false}/>
            <Typography h4>Dependent Variables</Typography>
            <Divider/>
            <VariableGrid data={data} setData={setData} isDependent={true}/>
            {/* {Object.entries(data).map(([key, value]) => (
                <VariableCard
                    variable={value}
                    onRemoveItem={onRemoveItem}
                />
            ))} */}
            <AddVariableCard data={data} setData={setData}/>
        </Stack>
    );
}