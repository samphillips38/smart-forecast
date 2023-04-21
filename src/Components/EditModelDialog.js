import { useDispatch } from "react-redux";
import { Typography, DialogContent, Card, CardActionArea } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";

import { getNewModel } from "../Utility";
import { modelEdited, modelAdded } from "../modelsReducer";

export default function EditModelDialog({ onClose, open, model }) {
    const dispatch = useDispatch();
    const editedModel = model ? {...model} : getNewModel();
    const onSaveClicked = () => {
        if (editedModel.id) {
            dispatch(modelEdited(editedModel))
        } else {
            dispatch(modelAdded(editedModel))
        }
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked()}}>
            <DialogContent>
                <Stack spacing={2} width="500px">
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
                        <CardActionArea>
                            <Stack height={50} direction="row" alignItems="center">
                                <AddIcon/>
                                <Typography>New Variable</Typography>
                            </Stack>
                        </CardActionArea>
                    </Card>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={onSaveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}