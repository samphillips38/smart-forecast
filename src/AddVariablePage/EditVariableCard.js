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
export default function EditVariableCard({ symbol, editedValue, setEditedValue, onRemoveItem }) {
  const classes = useStyles();
  const onVarNameChanged = (e) => {
    const newValue = editedValue;
    newValue["title"] = e.target.value;
    setEditedValue(newValue);
  };
  const onSymbolChanged = (e) => {
    const newValue = editedValue;
    newValue["symbol"] = e.target.value;
    setEditedValue(newValue);
  };
  const onExpressionChanged = (e) => {
    const newValue = editedValue;
    newValue["expression"] = e.target.value;
    setEditedValue(newValue);
  };
  return (
    <>
      <div className={classes.editVariable}>
        <TextField
          className={classes.textField}
          id={symbol}
          label="Name"
          defaultValue={editedValue.title}
          onChange={onVarNameChanged}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id={symbol}
          label="Symbol"
          defaultValue={editedValue.symbol}
          onChange={onSymbolChanged}
          variant="outlined"
        />
        <DragHandleIcon fontSize="small" />
        <TextField
          className={classes.textField}
          id={symbol}
          label="Expression"
          defaultValue={editedValue.expression}
          onChange={onExpressionChanged}
          variant="outlined"
        />
      </div>
      <div className={classes.showVariable}>
        <IconButton
          aria-label="delete"
          className={classes.deleteIcon}
          onClick={() => onRemoveItem(symbol)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </>
  );
}
