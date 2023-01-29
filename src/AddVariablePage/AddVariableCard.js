import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  }
}));

export default function AddVariableCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <IconButton aria-label="Do something">
        <AddIcon />
      </IconButton>
      <Typography variant="h7">Add New Variable</Typography>
    </Card>
  );
}
