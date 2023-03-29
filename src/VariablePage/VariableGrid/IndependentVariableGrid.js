import { Grid, CardContent, Typography, CardActionArea, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import IndependentVariableCard from "./IndependentVariableCard";
import DependentVariableCard from "./DependentVariableCard";
import AddVariablePage from "./EditVariablePage/AddVariablePage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectVariables } from "../../investmentsReducer";

export default function IndependentVariableGrid({ openAddVariable, setOpenAddVariable}) {
    const variables = useSelector(selectVariables);
    const onRemoveItem = () => {

    }
    const handleAddVariable = () => {
        setOpenAddVariable(true);
    }
    return (
        <Grid container spacing={2} wrap="wrap">
            {variables
            .filter((variable) => variable.type == "Independent")
            .map((variable) => (
                <Grid item key={variable.id} xs={12}>
                    <IndependentVariableCard
                    variable={variable}
                    onRemoveItem={onRemoveItem}
                    />
                </Grid>
            ))}
            <Grid item key="Add Variable" xs={12}>
                <Card>
                    <CardActionArea onClick={handleAddVariable}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <AddIcon/>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <AddVariablePage 
                    variable={null} 
                    open={openAddVariable} 
                    setOpen={setOpenAddVariable}
                    />
                </Card>
            </Grid>
        </Grid>
    );
}