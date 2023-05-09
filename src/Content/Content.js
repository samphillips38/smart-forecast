import { React } from "react";
import { Box } from "@mui/material";

import Dashboard from "./Dashboard/Dashboard";
import VariablePage from "./VariablePage/VariablePage";

function selectContent(content) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard/>);
        case "Add Variable":
            return (<VariablePage/>);
        default:
            return (<Dashboard/>);
    }; 
}

export default function Content({ content }) {
    return (
        <Box flexGrow={1} paddingTop={2} paddingBottom={2} paddingRight={1} paddingLeft={1} height="100%">
            {selectContent(content)}
        </Box>
    )
}