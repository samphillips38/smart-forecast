import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import VariablePage from "./VariablePage/VariablePage";

export default function Content({ data, setData, content }) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard data={data} />);
        case "Add Variable":
            return (<VariablePage data={data} setData={setData} />);
        default:
            return (<Dashboard data={data} />);
    };
}