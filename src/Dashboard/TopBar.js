import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import AddList from "./AddList";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
}));
export default function TopBar({
  onLayoutSave,
  onRemoveItem,
  onAddItem,
  itemSymbolsToDisplay,
  data
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <AddList
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
            itemSymbolsToDisplay={itemSymbolsToDisplay}
            data={data}
        />
        <IconButton aria-label="save" onClick={onLayoutSave}>
            <SaveIcon />
        </IconButton>
        <Button
            aria-label="Review"
            color="inherit"
            onClick={()=>{}}
        >Review</Button>
    </Card>
  );
}
