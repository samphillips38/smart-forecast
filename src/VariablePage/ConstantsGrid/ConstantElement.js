import { CardContent, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";

export default function ConstantElement({ variable }) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Typography>{variable.title}</Typography>
                    <Divider/>
                    <Typography>{`${variable.symbol} = ${variable.data}`}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}