import { React } from "react";
import { Box } from "@mui/material";

import Dashboard from "./Dashboard/Dashboard";
import VariablePage from "./VariablePage/VariablePage";
import ModelMap from "./ModelMap/ModelMap";

function selectContent(content) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard/>);
        case "Add Variable":
            return (<VariablePage/>);
        case "Model Map":
            return (<ModelMap/>);
        default:
            return (<Dashboard/>);
    }; 
}

export default function Content({ content }) {
    return (
        <Box flexGrow={1} paddingTop={2} paddingBottom={2} paddingRight={1} paddingLeft={30} height="100%">
            {selectContent(content)}
        </Box>
    )
}