import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Slider from '@mui/material/Slider';
import { Button } from "@material-ui/core";

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

function valuetext(value) {
    // Convert the value to a date string
    const date = new Date(value);
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return dateString;
}

function getMonthDiff(startDate, endDate) {
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    return yearDiff * 12 + monthDiff;
}

function getMarks(startDate, endDate) {
    const tempDate = new Date(startDate);
    const marks = [];
    const monthDiff = getMonthDiff(startDate, endDate);
    while (tempDate <= endDate) {
        marks.push({
            value: new Date(tempDate),
            label: valuetext(tempDate),
        });
        if (monthDiff  <= 24) {
            tempDate.setMonth(tempDate.getMonth() + 3);
        } else {
            tempDate.setMonth(tempDate.getMonth() + 6);
        }
    }
    marks.push({
        value: new Date(endDate),
        label: valuetext(endDate),
    });
    return marks;
}

export default function Timeline({  }) {
    const [value, setValue] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeline, setTimeline] = useState(initialTimeline);
    // const step = (timeline.breakPoints[-1].getDate() - timeline.breakPoints[0].getDate()) / 5
    const min = timeline.startDate.getTime();
    const max = timeline.endDate.getTime();
    const step =  (max - min) / getMonthDiff(timeline.startDate, timeline.endDate);
    const marks = getMarks(timeline.startDate, timeline.endDate);
    const [breakPoints, SetBreakpoints] = useState([timeline.startDate, timeline.startDate, timeline.startDate]);
    const onAddBreakpoint = () => {
        SetBreakpoints([...breakPoints, timeline.endDate]);
    }
    return (
        <Box paddingLeft={5} paddingRight={5} sx={{ width: '100%' }}>
            {/* <Stepper alternativeLabel color='inherited'>
                {timeline.breakPoints.map((date) => (
                <Step key={date.toLocaleDateString('en-GB')}>
                    <StepLabel>{date.toLocaleDateString('en-GB')}</StepLabel>
                </Step>
                ))}
            </Stepper> */}
            <Slider
                track={false}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="on"
                valueLabelFormat={valuetext}
                defaultValue={breakPoints}
                marks={marks}
            />
            <Button onClick={onAddBreakpoint}>
                Add Breakpoint
            </Button>
        </Box>
    )
}