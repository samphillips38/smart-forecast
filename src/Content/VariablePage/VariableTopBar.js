import { React, useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from "react-redux";

import { variableAdded, selectSelectedModel } from "../../modelsReducer";
import EditVariableDialog from "../../Components/EditVariableDialog/EditVariableDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
  }
}));
export default function VariableTopBar({
  onLayoutSave,
  onRemoveItem,
  onAddItem
}) {
    const classes = useStyles();
    const model = useSelector(selectSelectedModel);
    const dispatch = useDispatch();
    const [newVariableOpen, setNewVariableOpen] = useState(false);
    const addVariableClicked = () => {
        setNewVariableOpen(true);
    }
    const onVariableSaved = (variable) => {
        // const id = getNextVariableId(model);
        // const newVar = {
        //     ...variable,
        //     id: id
        // }
        // console.log(newVar);
        dispatch(variableAdded({ model, variable }));
        setNewVariableOpen(false);
    }
    const onVariableCancelled = () => {
        setNewVariableOpen(false);
    }

    return (
        <Card className={classes.root}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" variant="outlined" alignItems="center">
                    <IconButton>
                        <InfoIcon fontSize="small"/>
                    </IconButton>
                    <Typography>Fully Defined</Typography>
                </Stack>
                <Button 
                color="inherit" 
                variant="outlined"
                onClick={addVariableClicked}
                >Add Variable</Button>
            </Stack>
            <EditVariableDialog onCancelClicked={onVariableCancelled} onSaveClicked={onVariableSaved} open={newVariableOpen}/>
        </Card>
    );
}