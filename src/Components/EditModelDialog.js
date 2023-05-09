import { useState, useEffect } from "react";
import { Typography, DialogContent, Card, CardActionArea } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";

import { getNewModel, getNextVariableId } from "../Utility";
import EditVariableDialog from "./EditVariableDialog/EditVariableDialog";

export default function EditModelDialog({ onCancelClicked, onSaveClicked, open, model }) {
    const [newVariableOpen, setNewVariableOpen] = useState(false);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [editedModel, setEditedModel] = useState(model ? {...model} : getNewModel());
    useEffect(() => {
        setEditedModel(model ? {...model} : getNewModel());
    }, [open])
    const addVariableClicked = () => {
        setSelectedVariable(null);
        setNewVariableOpen(true);
    }
    const onVariableSaved = (variable) => {
        const id = getNextVariableId(editedModel);
        setEditedModel({
            ...editedModel,
            variables: {
                ...editedModel.variables,
                entities: {
                    ...editedModel.variables.entities,
                    [id]: {...variable, id: id}
                }
            }
        });
        setSelectedVariable(null);
        setNewVariableOpen(false);
    }
    const onVariableCancelled = () => {
        setNewVariableOpen(false);
    }
    return (
        <Dialog onClose={onCancelClicked} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked()}}>
            <DialogContent>
                <Stack spacing={2}>
                    <Typography >{model ? "Edit Model" : "Add Model"}</Typography>
                    <Stack spacing={2} direction="row">
                        <TextField
                            id="name"
                            label="Name"
                            defaultValue={editedModel.name}
                            onChange={(event)=>{editedModel.name = event.target.value}}
                            fullWidth
                        />
                        <TextField
                            id="description"
                            label="Description"
                            defaultValue={editedModel.description}
                            onChange={(event)=>{editedModel.description = event.target.value}}
                            fullWidth
                        />
                    </Stack>
                    <Typography >Variables</Typography>
                    {Object.values(editedModel.variables.entities).map((variable) => (
                        <Typography key={variable.id}>{variable.name}</Typography>
                    ))}
                    <Card>
                        <CardActionArea onClick={addVariableClicked}>
                            <Stack height={50} direction="row" alignItems="center" spacing={1} paddingLeft={1}>
                                <AddIcon/>
                                <Typography>New Variable</Typography>
                            </Stack>
                        </CardActionArea>
                    </Card>
                    <EditVariableDialog 
                    onCancelClicked={onVariableCancelled}
                    onSaveClicked={onVariableSaved}
                    open={newVariableOpen}
                    variable={selectedVariable}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={() => onSaveClicked(editedModel)}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}