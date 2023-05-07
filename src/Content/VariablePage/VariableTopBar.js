import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    // display: "flex",
    // justifyContent: "flex-end"
  }
}));
export default function VariableTopBar({
  onLayoutSave,
  onRemoveItem,
  onAddItem
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" variant="outlined" alignItems="center">
                <IconButton>
                    <InfoIcon/>
                </IconButton>
                <Typography>Fully Defined</Typography>
            </Stack>
            {/* <Button color="inherit" variant="outlined">
                <InfoIcon/>
                <Typography>Fully Defined</Typography>
            </Button> */}
            <Button color="inherit" variant="outlined">Add Variable</Button>
        </Stack>
    </Card>
  );
}