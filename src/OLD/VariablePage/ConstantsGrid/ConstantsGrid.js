import { Grid, CardContent, CardActionArea, Box, Typography, DialogContent, Divider } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getNewConstant } from "../../Utility";

import { useSelector, useDispatch } from "react-redux";
import { selectConstants, variableAdded, variableEdited } from "../../investmentsReducer";

function EditValue({ onClose, open, variable }) {
    const dispatch = useDispatch();
    const editedConstant = variable ? {...variable} : getNewConstant();
    const onSaveClicked = () => {
        if (editedConstant.id) {
            dispatch(variableEdited(editedConstant))
        } else {
            dispatch(variableAdded(editedConstant))
        }
        // const newData = data;
        // if (variableData && (variableData.symbol != editedConstant.symbol)) {
        //     console.log(variableData.symbol);
        //     delete newData[variableData.symbol];
        // }
        // newData[editedConstant.symbol] = editedConstant;
        // setData(newData);
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked()}}>
            <DialogContent>
                <Stack spacing={2} width="200px">
                    <Typography >{variable ? "Edit Constant" : "Add Constant"}</Typography>
                    <TextField
                        id="title"
                        label="Select Title"
                        defaultValue={editedConstant.title}
                        onChange={(event)=>{editedConstant.title = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="symbol"
                        label="Select Symbol"
                        defaultValue={editedConstant.symbol}
                        onChange={(event)=>{editedConstant.symbol = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="value"
                        label="Select Value"
                        defaultValue={editedConstant.data}
                        onChange={(event)=>{editedConstant.data = event.target.value}}
                        type="number"
                        fullWidth
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={onCancelClicked}>Cancel</Button>
                        <Button onClick={onSaveClicked}>Save</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

function ConstantElement({ variable, onClick }) {
    return (
        <Card style={{height: 'inherit'}}>
            <CardActionArea onClick={onClick}>
                <CardContent  style={{ minHeight: "100%" }}>
                    <Stack spacing={1} height={60}>
                        <Typography>{variable.title}</Typography>
                        <Divider/>
                        <Typography>{`${variable.symbol} = ${variable.data}`}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ConstantsGrid() {
    const constants = useSelector(selectConstants);
    const [open, setOpen] = useState(false);
    const [selectedConstant, setSelectedConstant] = useState(null);
    const handleAddConstant = () => {
        setSelectedConstant(null);
        setOpen(true);
    }
    const handleEditConstant = (variable) => {
        setSelectedConstant(variable);
        setOpen(true);
    }
    const onClose = (event) => {
        setOpen(false);
    }
    return (
        <Grid container spacing={3} alignItems="stretch">
            {constants.map((constant) => (
                <Grid item key={constant.id} xs={4} sm={3} md={2}>
                    <ConstantElement
                    variable={constant}
                    onClick={() => {handleEditConstant(constant)}}
                    />
                </Grid>
            ))}
            <Grid item key="Add Constant" xs={4} sm={3} md={2}>
                <Card>
                    <CardActionArea onClick={handleAddConstant}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px'}}>
                                <AddIcon/>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <EditValue onClose={onClose} open={open} variable={selectedConstant}/>
                </Card>
            </Grid>
        </Grid>
    );
}