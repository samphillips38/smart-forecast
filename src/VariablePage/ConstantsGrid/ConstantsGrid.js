import { Grid, CardContent } from "@material-ui/core";
import ConstantElement from "./ConstantElement";
import Card from "@material-ui/core/Card";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";

export default function ConstantsGrid({ data, setData }) {
    const handleAddConstant = () => {

    }
    return (
        <Grid container spacing={3} columns={6}>
            {Object.entries(data).map(([key, value]) => (
                value.type == "Constant" && (<Grid item key={key}>
                    <ConstantElement
                    variable={value}
                    />
                </Grid>)
            ))}
            <Grid item key="Add Constant">
                <Card >
                    <IconButton aria-label="Add Constant" onClick={handleAddConstant}>
                        <AddIcon />
                    </IconButton>
                </Card>
            </Grid>
        </Grid>
    );
}