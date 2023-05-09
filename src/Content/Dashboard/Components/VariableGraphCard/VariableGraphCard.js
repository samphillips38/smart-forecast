import { Card, Typography } from "@material-ui/core";
import { CardContent, Stack } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import IconButton from "@material-ui/core/IconButton";

export default function VariableGraphCard( { variable, layoutId } ) {
    console.log(layoutId)
    return (
        <Card key={layoutId}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>{variable.name}, {variable.symbol}</Typography>
                <IconButton className="drag-handle">
                    <DragHandleIcon />
                </IconButton>
            </Stack>
        </Card>
    );
}