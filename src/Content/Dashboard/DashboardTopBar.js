import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";

import ModelStatus from "./Components/ModelStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    // display: "flex",
    // alignItems: "stretch"
  }
}));
export default function DashboardTopBar() {
  const classes = useStyles();
  return (
    <Card aria-label="DashboardTopBarCard">
        <Stack direction="row" justifyContent="space-between" padding={1}>
            <ModelStatus/>
            <Button
                aria-label="Review"
                color="inherit"
                variant="outlined"
                onClick={()=>{}}
            >Review</Button>
        </Stack>
    </Card>
  );
}
