import Typography from "@material-ui/core/Typography";
import { Card, Grid } from "@material-ui/core";
import { CardContent } from "@mui/material";

function ProbCard({ index }) {
    console.log(index);
    return (
        <Card>
            <CardContent>
                <Typography>This is card {index}</Typography>
            </CardContent>
        </Card>
    );
}

export default function ProbSelector({ variable }) {
    return (
        <>
            <Typography>Probabilistic Selector</Typography>
            <Grid container spacing={2}>
                {[0, 1, 2, 3, 4, 5, 6].map((element) => (
                    <Grid item>
                        <ProbCard index={element} ></ProbCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}