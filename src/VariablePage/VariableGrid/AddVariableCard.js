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

export default function AddVariableCard({ data, setData }) {
  const classes = useStyles();
  const onClick = () => {
    const newData = data;
    newData["X"] = {
        symbol: "X",
        data: {
          time: [1, 2, 3, 4],
          mean: [0, 0, 0, 0],
          std: [1, 1, 1, 1]
        },
        expression: "0",
        title: "New Variable",
        isProb: false
      }
    setData(newData);
  }
  return (
    <Card className={classes.root}>
      <IconButton aria-label="Do something" onClick={onClick}>
        <AddIcon />
      </IconButton>
      <Typography variant="h6">Add New Variable</Typography>
    </Card>
  );
}
