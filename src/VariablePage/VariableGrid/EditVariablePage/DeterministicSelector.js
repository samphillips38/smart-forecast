import { Box, } from "@material-ui/core";
import DetVariableChart from "../../../charts/DetVariableChart";
import Button from '@mui/material/Button';

export default function DeterministicSelector({ variable }) {
    const onAddPoint = () => {
        
    }
    return (
        <>
            <DetVariableChart variableData={variable.data} width="100%" height={350}/>
            <Button onClick={onAddPoint} >Add Point</Button>
        </>
    );
}