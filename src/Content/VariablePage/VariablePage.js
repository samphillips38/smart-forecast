import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import Grid from '@mui/material/Grid';

import { selectVariables } from "../../modelsReducer";
import VariableTopBar from "./VariableTopBar";
import VariableCard from "../../Components/VariableCard";

export default function VariablePage() {
    const variables = useSelector(selectVariables);
    return (
        <Grid container spacing={2} aria-label="Variable Grid">
            <Grid item key={-1} xs={12}>
                <VariableTopBar/>
            </Grid>
            {variables.map((variable) => (
                <Grid item key={variable.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                    <VariableCard variable={variable}/>
                </Grid>
            ))}
        </Grid>
    );
}