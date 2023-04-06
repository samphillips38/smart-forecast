import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import RVariableChart from './RVariableChart'
import DetVariableChart from "./DetVariableChart";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem"
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: "0.5rem",
    flexGrow: 1
  }
});

export default function Widget({
  id,
  onRemoveItem,
  component: Item,
  variable
}) {
  const classes = useStyles();
  return (
        <Card className={classes.root}>
            <div className={classes.header}>
                <IconButton className="drag-handle">
                    <DragHandleIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom>{id}</Typography>
                    <div className={classes.spacer} />
                <IconButton aria-label="delete" onClick={() => onRemoveItem(id)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
            <div className={classes.body}>
                {variable.isProb ? (
                    <RVariableChart variableData={variable["data"]}/>
                ) : (
                    <DetVariableChart editedVariable={variable} />
                )}
                {/* <Item variableData={variable["data"]} /> */}
            </div>
        </Card>
  );
}
