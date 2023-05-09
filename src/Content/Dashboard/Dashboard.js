import React from "react";
import { Stack } from "@mui/material";

import DashboardTopBar from "./DashboardTopBar";
import DashboardGrid from "./DashboardGrid";
import BasicLayout from "./TestGrid";
import { Box } from "@material-ui/core";

export default function Dashboard() {
    return (
        <Stack spacing={2} alignItems="stretch">
            <DashboardTopBar/>
            <DashboardGrid />
        </Stack>
    );
}