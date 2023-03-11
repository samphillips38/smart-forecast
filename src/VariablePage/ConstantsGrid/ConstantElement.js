import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";

export default function ConstantElement({ variable }) {
    return (
        <Card>
            <CardContent>
                <Stack>
                    <Typography>{`${variable.title}, ${variable.symbol}`}</Typography>
                    <Typography>{`${variable.data}`}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}