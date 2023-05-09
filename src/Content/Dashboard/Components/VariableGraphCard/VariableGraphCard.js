import { Card, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';

export default function VariableGraphCard( { variable, layoutId } ) {
    console.log(layoutId)
    return (
        <Card key={layoutId}>
            <Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>{variable.name}, {variable.symbol}</Typography>
                    <DragHandleIcon/>
                </Stack>
            </Stack>
        </Card>
    );
}