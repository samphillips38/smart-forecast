import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import AddVariablePage from "./AddVariablePage/AddVariablePage";

export default function Content({ data, setData, content }) {
    switch (content) {
        case "Dashboard":
            return (<Dashboard data={data} />);
        case "Add Variable":
            return (<AddVariablePage data={data} setData={setData} />);
        default:
            return (<Dashboard data={data} />);
    };
}