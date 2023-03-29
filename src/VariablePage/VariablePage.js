import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@material-ui/core";
import ConstantsGrid from "./ConstantsGrid/ConstantsGrid";
import VariableGrid from "./VariableGrid/VariableGrid";
import DependentVariableGrid from "./VariableGrid/DependentVariableGrid";
import IndependentVariableGrid from "./VariableGrid/IndependentVariableGrid";

export default function VariablePage() {
    const [addIndependentVariableOpen, setAddIndependentVariableOpen] = useState(false);
    const [addDependentVariableOpen, setAddDependentVariableOpen] = useState(false);
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
                <Button onClick={() => setAddIndependentVariableOpen(true)}>Add Independent Variable</Button>
            </Stack>
            <Divider/>
            <IndependentVariableGrid
            openAddVariable={addIndependentVariableOpen}
            setOpenAddVariable={setAddIndependentVariableOpen} 
            />
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Dependent Variables</Typography>
                <Button onClick={() => setAddDependentVariableOpen(true)}>Add Dependent Variable</Button>
            </Stack>
            <Divider/>
            <DependentVariableGrid
            openAddVariable={addDependentVariableOpen}
            setOpenAddVariable={setAddDependentVariableOpen} 
            />
        </Stack>
    );
}