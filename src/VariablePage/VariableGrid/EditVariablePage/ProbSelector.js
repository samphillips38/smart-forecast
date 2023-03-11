import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Grid, CardContent } from "@material-ui/core";
import { Button, CardActionArea, CardActions } from '@mui/material';
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";
import TriangleChart from "../../../charts/ExampleCharts/Triangle";

function ProbCard({ onClick, children }) {
    return (
        <Grid item xs={6} sm={4} md={3}>
            <Card>
                <CardActionArea onClick={onClick}>
                    <CardContent>
                        {children}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default function ProbSelector({ variable, setVariable }) {
    const handleCardSelected = (selection) => {
        const newVar = variable;
        newVar.probType = selection;
        setVariable(newVar);
        console.log(selection);
    }
    return (
        <>
            <Typography>Probabilistic Selector</Typography>
            <Grid container spacing={2}>
                <ProbCard onClick={() => {handleCardSelected('Gaussian')}}>
                    <GaussianChart/>
                </ProbCard>
                <ProbCard onClick={() => {handleCardSelected('Triangular')}}>
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