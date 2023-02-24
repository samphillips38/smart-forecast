import { Grid, CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import IndependentVariableCard from "./IndependentVariableCard";

export default function VariableGrid({ data, setData, isDependent }) {
    const type = isDependent ? "Dependent" : "Independent";
    const onRemoveItem = () => {

    }
    const handleAddVariable = () => {

    }
    return (
        <Grid container spacing={2} wrap="wrap">
            {Object.entries(data).map(([key, value]) => (
                value.type == type && value.type == "Dependent" && (
                    <Grid item key={key} xs={12}>
                        <IndependentVariableCard
                        variable={value}
                        onRemoveItem={onRemoveItem}
                        />
                    </Grid>)
            ))}
            {Object.entries(data).map(([key, value]) => (
                value.type == type && value.type == "Independent" && (
                    <Grid item key={key} xs={12}>
                        <IndependentVariableCard
                        variable={value}
                        onRemoveItem={onRemoveItem}
                        />
                    </Grid>)
            ))}
            <Grid item key="Add Variable" xs={12}>
                <Card >
                    <IconButton aria-label="Add Variable" onClick={handleAddVariable}>
                        <AddIcon />
                    </IconButton>
                </Card>
            </Grid>
        </Grid>
    );
}