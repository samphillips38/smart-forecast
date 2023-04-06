import { Box, } from "@material-ui/core";
import DetVariableChart from "../../../charts/DetVariableChart";
import Button from '@mui/material/Button';

export default function DeterministicSelector({ editedVariable, setEditedVariable }) {
    const onAddPoint = () => {
        
    }
    return (
        <>
            <DetVariableChart 
            editedVariable={editedVariable} 
            setEditedVariable={setEditedVariable} 
            width="100%" height={350}
            />
            <Button onClick={onAddPoint} >Add Point</Button>
        </>
    );
}