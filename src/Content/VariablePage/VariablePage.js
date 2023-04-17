import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import { selectVariables } from "../../modelsReducer";
import VariableTopBar from "./VariableTopBar";
import VariableDialog from "./VariableDialog";
import VariableCard from "../../Components/VariableCard";

export default function VariablePage() {
    const variables = useSelector(selectVariables);
    const [showVariableIsOpen, setShowVariableIsOpen] = useState(false);
    return (
        <Stack spacing={2} >
            <VariableTopBar/>
            <Grid container>
                {variables.map((variable) => (
                    <Grid item id={variable.id}>
                        <VariableCard variable={variable}/>
                        <VariableDialog variable={variable} open={open} setOpen={setOpen}/>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}