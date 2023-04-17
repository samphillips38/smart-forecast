import React from "react";

import Dashboard from "./Dashboard/Dashboard";
import VariablePage from "./VariablePage/VariablePage";

export default function Content({ content }) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard/>);
        case "Add Variable":
            return (<VariablePage/>);
        default:
            return (<Dashboard data={data} />);
    };
}