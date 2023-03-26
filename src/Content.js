import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import VariablePage from "./VariablePage/VariablePage";

export default function Content({ content }) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard/>);
        case "Add Variable":
            return (<VariablePage data={data} setData={setData} />);
        default:
            return (<Dashboard data={data} />);
    };
}