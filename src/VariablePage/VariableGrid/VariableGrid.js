import { Grid, CardContent, Typography, CardActionArea, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import IndependentVariableCard from "./IndependentVariableCard";
import DependentVariableCard from "./DependentVariableCard";
import AddVariablePage from "./EditVariablePage/AddVariablePage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectInvestments, selectDisplayingInvestment, selectVariables } from "../../investmentsReducer";

export default function VariableGrid({ isDependent }) {
    const [open, setOpen] = useState(false);
    const type = isDependent ? "Dependent" : "Independent";
    const variables = useSelector(selectVariables);
    const onRemoveItem = () => {

    }
    const handleAddVariable = () => {
        setOpen(true);
    }
    return (
        <Grid container spacing={2} wrap="wrap">
            {variables
                .filter((variable) => variable.type == type)
                .map((variable) => (
                    <Grid item key={variable.id} xs={12}>
                        {
                            type == "Dependent" ? (
                                <DependentVariableCard
                                variable={variable}
                                onRemoveItem={onRemoveItem}
                                />
                            ) : (
                                <IndependentVariableCard
                                variable={variable}
                                onRemoveItem={onRemoveItem}
                                />
                            )
                        }
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
                    open={open} 
                    setOpen={setOpen}
                    />
                </Card>
            </Grid>
        </Grid>
    );
}