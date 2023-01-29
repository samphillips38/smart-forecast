import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function VariableCard({ symbol, value }) {
  return (
    <>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs>
          <TextField
            id={symbol}
            label={value.title + ", " + value.symbol}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <DragHandleIcon />
        </Grid>
        <Grid item xs>
          <TextField
            id={symbol}
            label={value.title + ", " + value.symbol}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}
