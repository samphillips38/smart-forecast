import React, { useCallback } from "react";
import { Stack } from "@mui/material";
import { ReactFlow } from "reactflow";

export default function ModelMap() {
    return (
        <Stack spacing={2} alignItems="stretch">
            <DashboardTopBar/>
            <DashboardGrid />
        </Stack>
    );
}