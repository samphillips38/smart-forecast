import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { InlineMath, renderMathInElement } from "react-katex";
import { useEffect, useRef } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditVariableCard from "./EditVariableCard";
import ShowVariableCard from "./ShowVariableCard";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  editVariable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 2,
    padding: "0.5rem",
    gap: "1rem"
  },
  showVariable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
    padding: "0.5rem"
    // gap: "1rem"
  },
  icon: {
    // width: "10px"
  },
  deleteIcon: {
    // width: "10px"
    // display: "flex",
  }
});
export default function VariableCard({ symbol, value, data, setData, onRemoveItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const classes = useStyles();
  const onEditClicked = () => {
    setIsEditing(!isEditing);
  }
  return (
    <Card className={classes.root}>
        {isEditing ? (
            <EditVariableCard symbol={symbol} editedValue={editedValue} setEditedValue={setEditedValue}/>
        ) : (
            <ShowVariableCard symbol={symbol} value={value} onEditClicked={onEditClicked} />
        )}
    </Card>
  );
}
