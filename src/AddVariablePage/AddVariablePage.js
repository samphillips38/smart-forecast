import { makeStyles } from "@material-ui/core/styles";
import OperatorBar from "./OperatorsBar";
import VariableBar from "./VariablesBar";
import VariableArea from "./VariableArea";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  operatorBar: {
    padding: "1rem"
  },
  variableBar: {
    padding: "1rem"
  }
}));

export default function AddVariablePage({ data, setData }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <OperatorBar className={classes.operatorBar} />
        <VariableBar className={classes.variableBar} />
        <VariableArea data={data} setData={setData} />
      </div>
    </>
  );
}
