import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import { Box } from "@material-ui/core";
import { Stack } from "@mui/material";

export default function ShowVariableCard({ variable, isEditing, setIsEditing, onRemoveItem }) {
  const onEditClicked = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
        <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{variable.title}, {variable.symbol}</Typography>
                <IconButton
                    aria-label="delete"
                    onClick={() => onRemoveItem(variable)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Typography variant="h6">Graphs will go here</Typography>
            <Box alignSelf="flex-end">
                <Button
                    aria-label="Edit"
                    color="inherit"
                    onClick={onEditClicked}
                >{isEditing ? "Edit Variable" : "Save Variable"}</Button>
            </Box>
        </Stack>
    </>
  );
}
