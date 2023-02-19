import React, { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "../charts/Widget";
import DetVariableChart from "../charts/DetVariableChart";
import RVariableChart from "../charts/RVariableChart";

function GraphArea({
  size: { width },
  itemSymbolsToDisplay,
  data,
  onRemoveItem,
  layouts,
  onLayoutChange
}) {
    console.log(itemSymbolsToDisplay);
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
            {itemSymbolsToDisplay.map((symbol) => (
            <div
                key={symbol}
                className="widget"
                data-grid={{ w: 1, h: 2, x: 0, y: Infinity, i: symbol }}
            >
                <Widget
                id={data[symbol]["title"]}
                onRemoveItem={onRemoveItem}
                component={
                    data[symbol]["isProb"] ? RVariableChart : DetVariableChart
                }
                variable={data[symbol]}
                />
            </div>
            ))}
        </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(
  GraphArea
);
