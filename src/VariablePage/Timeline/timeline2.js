import React, { useState, useEffect } from "react";
import { Chrono } from "react-chrono";

const currentDate = new Date();

const initialTimeline = {
    startDate: currentDate,
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 12, currentDate.getDate()),
    breakPoints: [
        currentDate,
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate()),
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate()),
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 9, currentDate.getDate()),
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 12, currentDate.getDate()),
    ]
}

export default function Timeline2({  }) {
    const matches = window.matchMedia("(min-width: 768px)").matches;
    const handler = (e) => { 
        matches = e.matches;
    };
    window.matchMedia("(min-width: 768px)").addEventListener("change", handler);

    const items = [
        {
        title: "example",
        cardTitle: "example",
        cardSubtitle: "example",
        cardDetailedText: "example",
        },
        {
        title: "example2",
        cardTitle: "example2",
        cardSubtitle: "example2",
        cardDetailedText: "example2",
        }
    ];

    return (
        <div style={{ width: "100%", height: "100%" }}>
        <Chrono
          items={items}
          mode={matches ? "HORIZONTAL" : "VERTICAL"}
          slideShow={false}
        //   itemWidth={"250"}
          hideControls={true}
        //   cardHeight={100}
          borderLessCards={true}
          theme={{
            primary: "#01bf71",
            secondary: "#010606",
            cardBgColor: "#f7f8fa",
            cardForeColor: "#010606",
            titleColor: "#fff",
          }}
        ></Chrono>
      </div>
    )
}