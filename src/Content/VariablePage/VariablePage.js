import React, { useState } from "react";
import Stack from '@mui/material/Stack';

import VariableTopBar from "./VariableTopBar";
import ShowVariable from "./VariableDialog";

export default function VariablePage() {
    const [showVariableIsOpen, setShowVariableIsOpen] = useState(false);
    return (
        <Stack spacing={2} >
            <VariableTopBar/>
        </Stack>
    );
}