import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
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
export default function DashboardTopBar({
  onLayoutSave,
  onRemoveItem,
  onAddItem
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <Stack direction="row" justifyContent="space-between">
            <ModelStatus/>
            <Button
                aria-label="Review"
                color="inherit"
                variant="outlined"
                onClick={()=>{}}
            >Review</Button>
        </Stack>
        {/* <IconButton aria-label="save" onClick={onLayoutSave}>
            <SaveIcon />
        </IconButton> */}
    </Card>
  );
}
