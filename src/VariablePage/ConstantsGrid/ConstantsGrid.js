import { Grid, CardContent, CardActionArea, Box, Typography, DialogContent } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import ConstantElement from "./ConstantElement";
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EditValue({ onClose, open, variableData }) {
    const newData = {
        title: variableData ? variableData.title : null,
        symbol: variableData ? variableData.symbol : null,
        data: variableData ? variableData.data : null,
        type: 'Constant',
        isProb: false
    }
    const onSaveClicked = () => {

        console.log(newData.title)
        onClose(newData);
    }
    const onCancelClicked = () => {
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <Stack spacing={2} width="200px">
                    <Typography >Edit Constant</Typography>
                    <TextField
                        id="title"
                        label="Select Title"
                        defaultValue={newData.title}
                        onChange={(event)=>{newData.title = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="symbol"
                        label="Select Symbol"
                        defaultValue={newData.symbol}
                        onChange={(event)=>{newData.symbol = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="value"
                        label="Select Value"
                        defaultValue={newData.data}
                        onChange={(event)=>{newData.data = event.target.value}}
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

export default function ConstantsGrid({ data, setData }) {
    const [open, setOpen] = useState(false);
    const handleAddConstant = () => {
        setOpen(true);
    }
    const onClose = (newVarData) => {
        const newData = data;
        newData[newVarData.symbol] = newVarData;
        setData(newData);
        setOpen(false);
    }
    return (
        <Grid container spacing={3} alignItems="stretch">
            {Object.entries(data).map(([key, value]) => (
                value.type == "Constant" && (
                    <Grid item key={key} xs={4} sm={3} md={2}>
                        <ConstantElement
                        variable={value}
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
                    <EditValue onClose={onClose} open={open} variableData={null} />
                </Card>
            </Grid>
        </Grid>
    );
}