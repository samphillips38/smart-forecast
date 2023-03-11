import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Grid, CardContent } from "@material-ui/core";
import { Button, CardActionArea } from '@mui/material';
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";
import TriangleChart from "../../../charts/ExampleCharts/Triangle";
import ProbAttributeSelector from "./ProbAttributeSelector";

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

export default function ProbSelector({ editedVariable, setEditedVariable }) {
    const handleCardSelected = (selection) => {
        const newVar = editedVariable;
        newVar.probType = selection;
        setEditedVariable(newVar);
        console.log(selection);
        console.log(`Prob type: ${editedVariable.probType}`);
    }
    return (
        <>
            <Typography>Select a distribution</Typography>
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
            <Typography>{editedVariable['probType']}</Typography>
            <ProbAttributeSelector editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
            {/* {(() => {
                switch (editedVariable.probType) {
                    case 'Gaussian':
                        return (<Typography>{editedVariable.probType}</Typography>);
                    case 'Triangular':
                        return (<Typography>{editedVariable.probType}</Typography>);
                    default:
                        return (<></>);
                }
            })()} */}
        </>
    );
}