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
import { useDispatch, useSelector } from "react-redux";
import { selectVariables } from "../investmentsReducer";
import { variableDisplayStatusUpdated } from "../investmentsReducer";

const useStyles = makeStyles((theme) => ({
  popup: {
    padding: theme.spacing(2)
  }
}));

export default function AddList({
        onRemoveItem,
        onAddItem
    }) {
        const variables = useSelector(selectVariables);
        const dispatch = useDispatch()

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
            const varSymbol = e.target.name;
            const variable = variables.filter((variable) => variable.symbol == varSymbol)[0];
            if (e.target.checked) {
                dispatch(variableDisplayStatusUpdated(variable.id, true))
            } else {
                dispatch(variableDisplayStatusUpdated(variable.id, false))
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
                        {variables.map((variable) => (
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={variable.displayOnDashboard}
                                onChange={handleChange}
                                name={variable.symbol}
                                />
                            }
                            label={variable.title}
                            key={variable.id}
                            />
                        ))}
                    {/* {Object.entries(data).map(([key, value]) => (
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
                    ))} */}
                    </FormGroup>
                </FormControl>
                </div>
            </Popover>
            </>
  );
}
