import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  popup: {
    padding: theme.spacing(2)
  }
}));

export default function AddList({
  onRemoveItem,
  onAddItem,
  itemSymbolsToDisplay,
  data
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  return (
    <>
      <IconButton aria-label="add" onClick={handleClick} aria-describedby={id}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div className={classes.popup}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Widgets</FormLabel>
            <FormGroup>
              {Object.entries(data).map(([key, value]) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={itemSymbolsToDisplay.includes(key)}
                      onChange={handleChange}
                      name={key}
                    />
                  }
                  label={value["title"]}
                  key={key}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Popover>
    </>
  );
}
