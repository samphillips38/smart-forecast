import { Card, Typography } from "@material-ui/core";
import { CardContent, Stack } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import IconButton from "@material-ui/core/IconButton";

import VariableGraph from "./VariableGraph";

export default function VariableGraphCard( { variable, layoutId } ) {
    return (
        <Card key={layoutId} style={{height: '100%', width: '100%'}}>
            <Stack spacing={1} height="100%">
                <Stack direction="row" justifyContent="space-between" alignItems="center" paddingLeft={1}>
                    <Typography>{variable.name}, {variable.symbol}</Typography>
                    <IconButton className="drag-handle">
                        <DragHandleIcon />
                    </IconButton>
                </Stack>
                <VariableGraph variable={variable}/>
            </Stack>
        </Card>
    );
}