import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import { selectSelectedModel } from "../../../modelsReducer";
import { Stack } from "@mui/material";
import { modelEdited } from "../../../modelsReducer";

export default function ModelStatus() {
    const dispatch = useDispatch()
    const model = useSelector(selectSelectedModel);
    const onClick = () => {
        const newStatus = model.status == "idle" ? "Running" : (model.status == "Running" ? "Pending" : "idle");
        dispatch(modelEdited({
            ...model,
            status: newStatus
        }))
    }

    switch (model ? model.status : null) {
        case "idle":
            return (
                <Button variant="outlined" color="inherit" onClick={onClick}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <CheckIcon color="success"/>
                        <Typography>Up to date</Typography>
                    </Stack>
                </Button>
            );
        case "Running":
            return (
                <Button variant="outlined" color="inherit" onClick={onClick}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <CircularProgress color="success" size={25}/>
                        <Typography>Running model</Typography>
                    </Stack>
                </Button>
            );
        case "Pending":
            return (
                <Button variant="outlined" color="inherit" onClick={onClick}>
                    <Typography>Run Model</Typography>
                </Button>
            );
        default:
            return (
                <Button variant="outlined" color="inherit" onClick={onClick}>
                    <Typography>No Model Selected</Typography>
                </Button>
            );
    }
}