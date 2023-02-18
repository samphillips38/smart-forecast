import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import { CardContent, Box } from "@material-ui/core";

export default function ShowVariableCard({ variable, setIsEditing, onRemoveItem }) {
  const onEditClicked = () => {
    setIsEditing(true);
  };
  return (
    <CardContent>
        <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">{variable.title}, {variable.symbol}</Typography>
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
                    alignSelf="flex-end"
                    aria-label="Edit"
                    color="inherit"
                    onClick={onEditClicked}
                >Edit Variable</Button>
            </Box>
        </Stack>
    </CardContent>
  );
}
