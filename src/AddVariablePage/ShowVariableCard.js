import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import { CardContent } from "@material-ui/core";

export default function ShowVariableCard({ variable, setIsEditing, onRemoveItem }) {
  const onEditClicked = () => {
    setIsEditing(true);
  };
  return (
    <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack>
                <Typography variant="h7">{variable.title}</Typography>
                <Typography variant="h7">Symbol Expression</Typography>
            </Stack>
            <Stack alignItems="flex-end" justifyContent="space-between">
                <IconButton
                    aria-label="delete"
                    onClick={() => onRemoveItem(variable)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Button
                    aria-label="Edit"
                    color="inherit"
                    onClick={onEditClicked}
                >Edit Variable</Button>
            </Stack>
        </Stack>
    </CardContent>
  );
}
