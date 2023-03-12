import Card from "@material-ui/core/Card";
import { useState } from 'react';
import ShowVariableCard from "./ShowVariableCard";
import { CardContent, Box } from "@material-ui/core";
import Button from '@mui/material/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Stack } from "@mui/material";
import AddVariablePage from "./EditVariablePage/AddVariablePage";

export default function IndependentVariableCard({ variable, onRemoveItem }) {
    const [open, setOpen] = useState(false);
    const [editedVariable, setEditedVariable] = useState(variable);
    const onEditClicked = () => {
        setOpen(true)
    };
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6">{editedVariable.title}, {editedVariable.symbol}</Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={() => onRemoveItem(variable)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    <ShowVariableCard variable={variable} editedVariable={editedVariable} setEditedVariable={setEditedVariable} onRemoveItem={onRemoveItem}/>
                    <Box alignSelf="flex-end">
                        <Button
                            aria-label="Edit"
                            color="inherit"
                            onClick={onEditClicked}
                        >Edit Variable</Button>
                    </Box>
                </Stack>
            </CardContent>
            <AddVariablePage 
                variable={variable} 
                open={open} 
                setOpen={setOpen}
                timelineData={null}
            />
        </Card>
  );
}
