import { makeStyles } from "@material-ui/core/styles";
import OperatorBar from "./OperatorsBar";
import VariableBar from "./VariablesBar";
import VariableArea from "./VariableArea";
import { getLayoutsFromFormattedData } from "../Utility";
import React, { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  operatorBar: {
    padding: "1rem"
  },
  variableBar: {
    padding: "1rem"
  }
}));

export default function AddVariablePage({ data, setData }) {
  const classes = useStyles();
  const [layouts, setLayouts] = useState(
    getFromLS("layouts") || getLayoutsFromFormattedData(data)
  );
//   const onLayoutChange = (_, allLayouts) => {
//     setLayouts(allLayouts);
//   };
//   const onLayoutSave = () => {
//     saveToLS("layouts", layouts);
//   };
  return (
    <>
      <div className={classes.root}>
        <OperatorBar className={classes.operatorBar} />
        <VariableBar className={classes.variableBar} />
        <VariableArea data={data} setData={setData} layouts={layouts}/>
      </div>
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