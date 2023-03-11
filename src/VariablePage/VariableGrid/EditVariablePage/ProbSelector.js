import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Grid, CardContent } from "@material-ui/core";
import { Button, CardActionArea } from '@mui/material';
import GaussianChart from "../../../charts/ExampleCharts/Gaussian";
import TriangleChart from "../../../charts/ExampleCharts/Triangle";
import { useState } from "react";
import EditableGaussian from "../../../charts/EditableGaussian";
import EditableTriangular from "../../../charts/EditableTriangular";

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
    const [selectedDist, setSelectedDist] = useState(editedVariable.probType || 'None');
    const handleCardSelected = (selection) => {
        const newVar = editedVariable;
        newVar.probType = selection;
        setEditedVariable(newVar);
        console.log(selection);
        console.log(`Prob type: ${editedVariable.probType}`);
        setSelectedDist(selection);
    }
    return (
        <>
            <Typography>Select a distribution</Typography>
            <Grid container spacing={2}>
                <ProbCard onClick={() => {handleCardSelected('Gaussian')}}>
                    <GaussianChart width="100%" height={150}/>
                </ProbCard>
                <ProbCard onClick={() => {handleCardSelected('Triangular')}}>
                    <TriangleChart width="100%" height={150}/>
                </ProbCard>
            </Grid>
            <Typography>{editedVariable['probType']}</Typography>
            {(() => {
                switch (selectedDist) {
                    case 'Gaussian':
                        return (<EditableGaussian variableData={editedVariable.data}/>);
                    case 'Triangular':
                        return (<EditableTriangular variableData={editedVariable.data}/>);
                    default:
                        return (<></>);
                }
            })()}
        </>
    );
}