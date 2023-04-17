import Card from "@material-ui/core/Card";
import { useState } from 'react';
import { CardContent, Box } from "@material-ui/core";
import Button from '@mui/material/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Stack } from "@mui/material";
import AddVariablePage from "./EditVariablePage/AddVariablePage";
import DoubleGraph from "./DoubleGraph";
import DetVariableChart from "../../charts/DetVariableChart";

export default function IndependentVariableCard({ variable, onRemoveItem, onEditClicked }) {
    const [open, setOpen] = useState(false);
    return (
        <Card>
            <CardContent>
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
                    {/* <ShowVariableCard variable={variable} editedVariable={variable} onRemoveItem={onRemoveItem}/> */}
                    {variable.isProb ? (
                        <DoubleGraph editedVariable={variable}/>
                    ) : (
                        <DetVariableChart editedVariable={variable} width="100%" height={350}/>
                    )}
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
