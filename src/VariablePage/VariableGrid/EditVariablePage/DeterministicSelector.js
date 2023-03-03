import Typography from "@material-ui/core/Typography";
import { Box, Grid, Table } from "@material-ui/core";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import DetVariableChart from "../../../charts/DetVariableChart";

export default function DeterministicSelector({ variable, timelineData }) {
    console.log(`At DetSelector: ${timelineData}`);
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Table SX= {{ minWidth: 650 }} aria-label="Det Table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timelineData.map((date, index) => (
                            <TableRow>
                                <TableCell 
                                    align="right">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</TableCell>
                                <TableCell align="right">{index}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box height={300}>
                    <DetVariableChart variableData={variable.data}/>
                </Box>
            </Grid>
        </Grid>
    );
}