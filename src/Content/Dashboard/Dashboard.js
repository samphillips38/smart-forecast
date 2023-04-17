import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import DashboardTopBar from "./DashboardTopBar";
import { getLayoutsFromVariableList } from "../../Utility";
import { selectVariables } from "../../modelsReducer";

export default function Dashboard() {
    const variables = useSelector(selectVariables);
    const [layouts, setLayouts] = useState(
        getFromLS("layouts") || getLayoutsFromVariableList(variables)
    );

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };
    const onLayoutSave = () => {
        saveToLS("layouts", layouts);
    };
    const onRemoveItem = (symbol) => {
        setItemSymbolsToDisplay(itemSymbolsToDisplay.filter((i) => i !== symbol));
    };
    const onAddItem = (symbol) => {
        setItemSymbolsToDisplay([...itemSymbolsToDisplay, symbol]);
    };
    useEffect(() => {
        setLayouts(getLayoutsFromVariableList(variables));
    }, [variables]);

    return (
        <>
        <DashboardTopBar
            onLayoutSave={onLayoutSave}
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
        />
        {/* <GraphArea
        className="GraphArea"
        onRemoveItem={onRemoveItem}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        /> */}
        </>
    );
    }

    function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {}
    }
    return ls[key];
    }

    function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
            [key]: value
        })
        );
    }
    }
