import { Grid, CardContent, CardActionArea, Box, Typography, DialogContent, Divider } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EditValue({ onClose, open, variableData, data, setData, isNew }) {
    const editedConstant = {
            title: variableData ? variableData.title : null,
            symbol: variableData ? variableData.symbol : null,
            data: variableData ? variableData.data : null,
            type: 'Constant',
            isProb: false
        }
    const onSaveClicked = () => {
        const newData = data;
        if (variableData && (variableData.symbol != editedConstant.symbol)) {
            console.log(variableData.symbol);
            delete newData[variableData.symbol];
        }
        newData[editedConstant.symbol] = editedConstant;
        setData(newData);
        onClose();
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open} onKeyUp={(e) => {e.key == "Enter" && onSaveClicked()}}>
            <DialogContent>
                <Stack spacing={2} width="200px">
                    <Typography >{variableData ? "Edit Constant" : "Add Constant"}</Typography>
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
                    <Stack spacing={1}>
                        <Typography>{variable.title}</Typography>
                        <Divider/>
                        <Typography>{`${variable.symbol} = ${variable.data}`}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ConstantsGrid({ data, setData }) {
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
            {Object.entries(data).map(([key, value]) => (
                value.type == "Constant" && (
                    <Grid item key={key} xs={4} sm={3} md={2}>
                        <ConstantElement
                        variable={value}
                        onClick={() => {handleEditConstant(value)}}
                        />
                    </Grid>
                    )
            ))}
            <Grid item key="Add Constant" xs={4} sm={3} md={2}>
                <Card>
                    <CardActionArea onClick={handleAddConstant}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <AddIcon/>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <EditValue onClose={onClose} open={open} variableData={selectedConstant} data={data} setData={setData}/>
                </Card>
            </Grid>
        </Grid>
    );
}