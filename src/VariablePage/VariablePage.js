import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@material-ui/core";
import ConstantsGrid from "./ConstantsGrid/ConstantsGrid";
import VariableGrid from "./VariableGrid/VariableGrid";
import { getTimelineData } from "../Utility";

export default function VariablePage() {
    const onRemoveItem = (variable) => {
        console.log('Deleted');
        console.log(variable.symbol);
    };
    return (
        <Stack spacing={2} >
            <Typography variant="h5">Constants</Typography>
            <Divider/>
            <ConstantsGrid/>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Independent Variables</Typography>
                <Button>Add Independent Variable</Button>
            </Stack>
            <Divider/>
            <VariableGrid isDependent={false} />
            <Typography variant="h5">Dependent Variables</Typography>
            <Divider/>
            <VariableGrid isDependent={true} />
        </Stack>
    );
}