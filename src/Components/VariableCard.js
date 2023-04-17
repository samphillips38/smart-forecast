import { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Stack, CardActionArea } from "@mui/material";

import VariableDialog from "./VariableDialog";

export default function VariableCard({ variable }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    return (
        <Card>
            <CardActionArea onClick={() => setDialogIsOpen(true)}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{variable.name}, {variable.symbol}</Typography>
                </Stack>
            </CardActionArea>
            <VariableDialog variable={variable} open={dialogIsOpen} setOpen={setDialogIsOpen}/>
        </Card>
  );
}