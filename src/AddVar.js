import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VariableCard from "./VariableCard";
import Grid from "@mui/material/Grid";
import CalculateIcon from "@mui/icons-material/Calculate";

const useStyles = makeStyles((theme) => ({
  popup: {
    padding: theme.spacing(2)
  }
}));

export default function AddVar({ data, setData, onClick }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const addVar = (dataElement) => {
    data.push(dataElement);
  };

  return (
    <>
      <ListItem
        button
        aria-label="add"
        onClick={handleClick}
        aria-describedby={id}
      >
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="Add Variable" />
      </ListItem>
    </>
  );
}
