import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Grid, CardContent } from "@material-ui/core";
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";
import TriangleChart from "../../../charts/ExampleCharts/Triangle";

// function ProbCard({ child }) {
//     return (
//         <Card>
//             <CardContent>
//                 {...child}
//             </CardContent>
//         </Card>
//     );
// }

export default function ProbSelector({ variable }) {
    return (
        <>
            <Typography>Probabilistic Selector</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={4} md={3}>
                    <Card>
                        <CardContent>
                            <GaussianChart/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Card>
                        <CardContent>
                            <TriangleChart/>
                        </CardContent>
                    </Card>
                </Grid>
                {[0, 1, 3].map((element) => (
                    <Grid item xs={6} sm={4} md={3}>
                        <Card>
                            <CardContent>
                                <GaussianChart/>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}