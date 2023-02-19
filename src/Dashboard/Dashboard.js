import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import GraphArea from "./GraphArea";
import { getLayoutsFromFormattedData } from "../Utility";

export default function Dashboard({ data }) {
  const [itemSymbolsToDisplay, setItemSymbolsToDisplay] = useState([]);
  const [layouts, setLayouts] = useState(
    getFromLS("layouts") || getLayoutsFromFormattedData(data)
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
  const getItemSymbolsToDisplay = () => {
    let output = [];
    Object.entries(data).map(([key, value]) => {
        if (value.type != 'Constant') {
            output.push(key);
        }
    })
    return output;
  }

  useEffect(() => {
    setItemSymbolsToDisplay(getItemSymbolsToDisplay());
    setLayouts(getLayoutsFromFormattedData(data));
  }, [data]);

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        itemSymbolsToDisplay={itemSymbolsToDisplay}
        data={data}
      />
      <GraphArea
        className="GraphArea"
        itemSymbolsToDisplay={itemSymbolsToDisplay}
        data={data}
        onRemoveItem={onRemoveItem}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
      />
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
