import { Grid, CardContent, CardActionArea, Box, Typography, DialogContent, Divider } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EditValue({ onClose, open, variableData, data, setData }) {
    const newVarData = {
        title: variableData ? variableData.title : null,
        symbol: variableData ? variableData.symbol : null,
        data: variableData ? variableData.data : null,
        type: 'Constant',
        isProb: false
    }
    const onSaveClicked = () => {
        const newData = data;
        newData[newVarData.symbol] = newVarData;
        setData(newData);
        onClose();
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
                        defaultValue={newVarData.title}
                        onChange={(event)=>{newVarData.title = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="symbol"
                        label="Select Symbol"
                        defaultValue={newVarData.symbol}
                        onChange={(event)=>{newVarData.symbol = event.target.value}}
                        fullWidth
                    />
                    <TextField
                        id="value"
                        label="Select Value"
                        defaultValue={newVarData.data}
                        onChange={(event)=>{newVarData.data = event.target.value}}
                        type="number"
                        onKeyDown={(e) => {e.key == "Enter" && onSaveClicked()}}
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
    const handleAddConstant = () => {
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
                        onClick={() => {setOpen(true)}}
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
                    <EditValue onClose={onClose} open={open} variableData={null} data={data} setData={setData} />
                </Card>
            </Grid>
        </Grid>
    );
}