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
    const [editedVariable, setEditedVariable] = useState(null);
    const onRemoveItem = () => {

    }
    const handleAddVariable = () => {
        setOpenAddVariable(true);
    }
    const onOpen = (varId) => {
        console.log(varId);
        if (varId !== null) {
            const variable = variables.filter((variable) => variable.id == varId)[0];
            console.log(variable);
            setEditedVariable(variable);
        } else {
            setEditedVariable(null);
        }
        console.log(editedVariable);
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
                    onEditClicked={() => onOpen(variable.id)}
                    />
                </Grid>
            ))}
            <Grid item key="Add Variable" xs={12}>
                <Card>
                    <CardActionArea onClick={() => onOpen(null)}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <AddIcon/>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <AddVariablePage 
            variable={editedVariable} 
            open={openAddVariable} 
            setOpen={setOpenAddVariable}
            />
        </Grid>
    );
}