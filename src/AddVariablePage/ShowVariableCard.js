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
export default function ShowVariableCard({ symbol, value, onEditClicked }) {
  const elementRef = useRef(null);
  const classes = useStyles();
  const onRemoveItem = (id) => {
    console.log(id);
  };
  const onVarNameChanged = (e) => {
    const newData = data;
    const newValue = value;
    newValue["title"] = e.target.value;
    newData[symbol] = newValue;
    setData(newData);
  };
  const onSymbolChanged = (e) => {
    const newData = data;
    const newValue = value;
    newValue["symbol"] = e.target.value;
    newData[symbol] = newValue;
    setData(newData);
  };
  const onExpressionChanged = (e) => {
    const newData = data;
    const newValue = value;
    newValue["expression"] = e.target.value;
    newData[symbol] = newValue;
    setData(newData);
  };
  return (
    <Card className={classes.root}>
      <div className={classes.editVariable}>
        <TextField
          className={classes.textField}
          id={symbol}
          label="Name"
          defaultValue={value.title}
          onChange={onVarNameChanged}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id={symbol}
          label="Symbol"
          defaultValue={value.symbol}
          onChange={onSymbolChanged}
          variant="outlined"
        />
        <DragHandleIcon fontSize="small" />
        <TextField
          className={classes.textField}
          id={symbol}
          label="Expression"
          defaultValue={value.expression}
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
    </Card>
  );
}
