import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import RVariableChart from "../charts/RVariableChart";
import DetVariableChart from "../charts/DetVariableChart";
import { Box } from "@material-ui/core";
import EditableGraph from "./EditableGraph";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
    const { value, editedVariable, setEditedVariable, ...other } = props;
    switch (value) {
        case 0:
            return (
                <>
                    {editedVariable.isProb ? (
                        <EditableGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
                    ) : (
                        <DetVariableChart variableData={editedVariable.data}/>
                    )}
                </>
            );
        case 1:
            return (
                <Box sx={{ p: 3 }}>
                    <Typography>Thing 2</Typography>
                </Box>
            );
        case 2:
            return (
                <TextField
                    id={`Constant ${editedVariable.symbol}`}
                    label="Constant"
                    defaultValue={1}
                    onChange={() => {}}
                />
            );
        default:
            break;
    }
};

TabPanel.propTypes = {
    value: PropTypes.number.isRequired,
    editedVariable: PropTypes.any.isRequired,
    setEditedVariable: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'color': 'inherit',
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function EditVariableCard({ variable, editedVariable, setEditedVariable, onRemoveItem }) {
    const [tabIndex, setTabIndex] = useState(0);
    const onTabIndexChange = (event, newValue) => {
        setTabIndex(newValue);
        console.log('tab index now');
        console.log(newValue);
    }
    const onVarNameChanged = (e) => {
        const newValue = editedVariable;
        newValue.title = e.target.value;
        setEditedVariable(newValue);
    };
    const onSymbolChanged = (e) => {
        const newValue = editedVariable;
        newValue.symbol = e.target.value;
        setEditedVariable(newValue);
    };
    const onExpressionChanged = (e) => {
        const newValue = editedVariable;
        newValue.expression = e.target.value;
        setEditedVariable(newValue);
    };
    const onSaveClicked = () => {
        console.log("Saved");
        setIsEditing(false);
    };
    return (
        <>
            <Stack direction="row" spacing={3} alignItems="center">
                <TextField
                    id={variable.symbol}
                    label="Variable Name"
                    defaultValue={editedVariable.title}
                    onChange={onVarNameChanged}
                />
                <TextField
                    id={variable.symbol}
                    label="Symbol"
                    defaultValue={editedVariable.symbol}
                    onChange={onSymbolChanged}
                />
            </Stack>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={onTabIndexChange} aria-label="basic tabs example" color="inherit">
                    <Tab label="Independent" {...a11yProps(0)} />
                    <Tab label="Dependent" {...a11yProps(1)} />
                    <Tab label="Constant" {...a11yProps(2)}/>
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
            {/* <TabPanel value={tabIndex} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                Item Three
            </TabPanel> */}
            {/* {variable.isProb ? (
                <EditableGraph editedVariable={editedVariable} setEditedVariable={setEditedVariable}/>
                // <RVariableChart variableData={editedVariable.data}/>
            ) : (
                <DetVariableChart variableData={editedVariable.data}/>
            )} */}
        </>
    );
}
