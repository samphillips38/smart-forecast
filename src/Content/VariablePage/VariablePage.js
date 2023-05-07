import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import { selectVariables } from "../../modelsReducer";
import VariableTopBar from "./VariableTopBar";
import VariableCard from "../../Components/VariableCard";

export default function VariablePage() {
    const variables = useSelector(selectVariables);
    return (
        <Stack spacing={2} >
            <VariableTopBar/>
            <Grid container spacing={2} wrap="wrap">
                {variables.map((variable) => (
                    <Grid item id={variable.id}>
                        <VariableCard variable={variable}/>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}