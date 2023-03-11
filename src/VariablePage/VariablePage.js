import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import ConstantsGrid from "./ConstantsGrid/ConstantsGrid";
import VariableGrid from "./VariableGrid/VariableGrid";
import { getTimelineData } from "../Utility";

export default function VariablePage({ data, setData }) {
    const onRemoveItem = (variable) => {
        console.log('Deleted');
        console.log(variable.symbol);
    };
    const timelineData = getTimelineData();
    return (
        <Stack spacing={2} >
            <Typography variant="h5">Constants</Typography>
            <Divider/>
            <ConstantsGrid data={data} setData={setData}></ConstantsGrid>
            <Typography variant="h5">Independent Variables</Typography>
            <Divider/>
            <VariableGrid 
            data={data} 
            setData={setData} 
            isDependent={false} 
            timelineData={timelineData}
            />
            <Typography variant="h5">Dependent Variables</Typography>
            <Divider/>
            <VariableGrid 
            data={data} 
            setData={setData} 
            isDependent={true} 
            timelineData={timelineData}
            />
        </Stack>
    );
}