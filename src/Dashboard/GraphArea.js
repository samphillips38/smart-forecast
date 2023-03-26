import React, { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "../charts/Widget";
import DetVariableChart from "../charts/DetVariableChart";
import RVariableChart from "../charts/RVariableChart";
import { useSelector } from "react-redux";
import { selectVariables } from "../investmentsReducer";

function GraphArea({
        size: { width },
        onRemoveItem,
        layouts,
        onLayoutChange
    }) {
    const variables = useSelector(selectVariables);
    return (
        <>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
                rowHeight={150}
                width={width}
                onLayoutChange={onLayoutChange}
            >
                {variables.filter((variable) => variable.type !== "Constant" && variable.displayOnDashboard).map((variable) => (
                <div
                    key={variable.symbol}
                    className="widget"
                    data-grid={{ w: 1, h: 2, x: 0, y: Infinity, i: variable.symbol }}
                >
                    <Widget
                    id={variable.title}
                    onRemoveItem={onRemoveItem}
                    component={
                        variable.isProb ? RVariableChart : DetVariableChart
                    }
                    variable={variable}
                    />
                </div>
                ))}
            </ResponsiveGridLayout>
        </>
    );
}

export default withSize({ refreshMode: "throttle", refreshRate: 166 })(
  GraphArea
);
