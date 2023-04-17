import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Stack } from "@mui/material";

export default function VariableCard({ variable }) {
    return (
        <Card>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{variable.name}, {variable.symbol}</Typography>
                </Stack>
            </CardContent>
        </Card>
  );
}
