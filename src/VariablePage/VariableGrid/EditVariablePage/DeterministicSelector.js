import { Box, } from "@material-ui/core";
import DetVariableChart from "../../../charts/DetVariableChart";
import Button from '@mui/material/Button';

export default function DeterministicSelector({ variable }) {
    const onAddPoint = () => {
        
    }
    return (
        <>
            <Box height={350}>
                <DetVariableChart variableData={variable.data}/>
            </Box>
            <Button onClick={onAddPoint} >Add Point</Button>
        </>
    );
}