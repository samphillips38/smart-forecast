import { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Stack, CardActionArea, Box } from "@mui/material";

import VariableDialog from "./VariableDialog";

export default function VariableCard({ variable }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    return (
        <Card>
            <CardActionArea onClick={() => setDialogIsOpen(true)}>
                <Stack direction="row" justifyContent="space-between" width={400} padding={1}>
                    <Typography variant="h6">{variable.name}, {variable.symbol}</Typography>
                    <Stack direction="row" spacing={1}>
                        {variable.dependencies && variable.dependencies.length > 0 ? 
                            variable.dependencies.map(element => (
                                <Box 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center" 
                                border={1}
                                borderRadius="10%"
                                height={30} width={30} >
                                    <Typography>{element}</Typography>
                                </Box>
                            )) : (
                                <></>
                        )}
                        
                    </Stack>
                </Stack>
            </CardActionArea>
            <VariableDialog variable={variable} open={dialogIsOpen} setOpen={setDialogIsOpen}/>
        </Card>
  );
}