import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Grid, CardContent } from "@material-ui/core";
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";
import TriangleChart from "../../../charts/ExampleCharts/Triangle";

function ProbCard({ children }) {
    return (
        <Grid item xs={6} sm={4} md={3}>
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default function ProbSelector({ variable }) {
    return (
        <>
            <Typography>Probabilistic Selector</Typography>
            <Grid container spacing={2}>
                <ProbCard>
                    <GaussianChart/>
                </ProbCard>
                <ProbCard>
                    <TriangleChart/>
                </ProbCard>
                {[0, 1, 2, 3].map((element) => (
                    <ProbCard>
                        {element % 2 ? (<TriangleChart/>) : (<GaussianChart/>)}
                    </ProbCard>
                ))}
            </Grid>
        </>
    );
}