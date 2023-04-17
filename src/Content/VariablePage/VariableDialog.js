import React from "react";
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";

export default function VariableDialog({ variable, open, setOpen }) {
    const onClose = () => {
        setOpen(false);
    }
    const onEditClicked = () => {

    }
    return (
        <Dialog onClose={onClose} open={open} maxWidth={false}>
            <DialogTitle>{variable.name}</DialogTitle>
            <DialogContent style={{width: '75vw', maxHeight: '90vh'}}>
                <Stack spacing={2}>
                    <Typography>{variable.name}</Typography>
                    <Typography>{variable.symbol}</Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}