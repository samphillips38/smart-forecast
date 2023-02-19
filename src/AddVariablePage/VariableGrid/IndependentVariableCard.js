import Card from "@material-ui/core/Card";
import { useState } from 'react';
import EditVariableCard from "../EditVariableCard";
import ShowVariableCard from "../ShowVariableCard";
import { CardContent, Box } from "@material-ui/core";
import Button from '@mui/material/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Stack } from "@mui/material";

export default function IndependentVariableCard({ variable, onRemoveItem }) {
    const [editedVariable, setEditedVariable] = useState(variable);
    const [isEditing, setIsEditing] = useState(false);
    const onEditClicked = () => {
        setIsEditing(!isEditing);
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
                    {isEditing ? (
                        <EditVariableCard variable={variable} editedVariable={editedVariable} setEditedVariable={setEditedVariable} setIsEditing={setIsEditing} onRemoveItem={onRemoveItem}/>
                    ) : (
                        <ShowVariableCard variable={variable} editedVariable={editedVariable} setEditedVariable={setEditedVariable} onRemoveItem={onRemoveItem}/>
                    )}
                    <Box alignSelf="flex-end">
                        <Button
                            alignSelf="flex-end"
                            aria-label="Edit"
                            color="inherit"
                            onClick={onEditClicked}
                        >{isEditing ? "Save Variable" : "Edit Variable"}</Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
  );
}
