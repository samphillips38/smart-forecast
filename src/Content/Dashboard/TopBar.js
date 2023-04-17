import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
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
  onAddItem
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        {/* <AddList
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
        /> */}
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
