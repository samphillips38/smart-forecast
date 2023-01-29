import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import AddVariablePage from "./AddVariablePage/AddVariablePage";

export default function Content({ data, setData, content }) {
  return (
    <>
      {content === "Dashboard" ? (
        <Dashboard data={data} />
      ) : (
        <AddVariablePage data={data} setData={setData} />
      )}
    </>
  );
}
