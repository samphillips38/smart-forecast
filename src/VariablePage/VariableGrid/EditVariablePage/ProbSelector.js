import Typography from "@material-ui/core/Typography";
import { Card, Grid } from "@material-ui/core";
import { CardContent } from "@mui/material";
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";

function ProbCard({ index }) {
    console.log(index);
    return (
        <Card>
            <CardContent>
                <GaussianChart/>
            </CardContent>
        </Card>
    );
}

export default function ProbSelector({ variable }) {
    return (
        <>
            <Typography>Probabilistic Selector</Typography>
            <Grid container spacing={2}>
                {[0, 1, 3, 4, 5, 6, 7].map((element) => (
                    <Grid item xs={6} sm={4} md={3}>
                        <ProbCard index={element} ></ProbCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}