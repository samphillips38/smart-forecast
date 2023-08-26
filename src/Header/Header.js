import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { selectSelectedModel, selectModelAndLoadVariables, selectAllModels, modelAdded } from "../Reducers/modelsReducer";
import EditModelDialog from "../Components/EditModelDialog";
import { getNextModelId } from "../Utility";
import store from "../store";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  rightIcons: {
    marginLeft: theme.spacing(0.5)
  },
  spacer: {
    flexGrow: 1
  }
}));

function MobileContent({ 
    models,
    selectedModel, 
    onSelectedNewModel, 
    onNewModelCancelled, 
    onNewModelSaved, 
    editModelOpen, 
    setEditModelOpen,
    toggleDarkMode, 
    handleDrawerToggle,
    darkMode }){
    return (
        <>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        // edge="start"
        // sx={{
        //     display: { xs: 'block', sm: 'none' }
        //     }}
        >
                <MenuIcon />
        </IconButton>
        <Box flexGrow={1}/>
        <Stack spacing={0.5} direction="row" alignItems="center">
            <FormControl size="small">
                <InputLabel id="model-select-label">Model</InputLabel>
                    <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={selectedModel ? selectedModel.id : -1}
                    label="Age"
                    onChange={onSelectedNewModel}
                    >
                        <MenuItem value={-1} key={-1}>None</MenuItem>
                        {models && (
                            models.map((model) => (
                                <MenuItem value={model.id} key={model.id}>{model.name}</MenuItem>
                            ))
                        )}
                    </Select>
            </FormControl>
            <IconButton
            color="inherit"
            variant="outlined"
            onClick={() => setEditModelOpen(true)}
            >
                <AddIcon/>
            </IconButton>
            <EditModelDialog 
            onCancelClicked={onNewModelCancelled}
            onSaveClicked={onNewModelSaved}
            open={editModelOpen}
            model={null}
            />
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDarkMode}
            size={"small"}
            >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Stack>
        </>
    );
}

function DesktopContent({ 
    models,
    selectedModel, 
    onSelectedNewModel, 
    onNewModelCancelled, 
    onNewModelSaved, 
    editModelOpen, 
    setEditModelOpen,
    toggleDarkMode, 
    handleDrawerToggle,
    darkMode }) {
    return (
        <>
        <Typography variant="h6" align="center">
            Model Creator
        </Typography>
        <Box flexGrow={1}/>
        <Stack spacing={2} direction="row" alignItems="center">
            <FormControl size="small">
                <InputLabel id="model-select-label">Model</InputLabel>
                    <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={selectedModel ? selectedModel.id : -1}
                    label="Age"
                    onChange={onSelectedNewModel}
                    >
                        <MenuItem value={-1} key={-1}>None</MenuItem>
                        {models && (
                            models.map((model) => (
                                <MenuItem value={model.id} key={model.id}>{model.name}</MenuItem>
                            ))
                        )}
                    </Select>
            </FormControl>
            <Button
            color="inherit"
            variant="outlined"
            onClick={() => setEditModelOpen(true)}
            size={"medium"}
            >
                New Model
            </Button>
            <EditModelDialog 
            onCancelClicked={onNewModelCancelled}
            onSaveClicked={onNewModelSaved}
            open={editModelOpen}
            model={null}
            />
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDarkMode}
            size="medium"
            >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            >
                <AccountCircleIcon />
            </IconButton>
        </Stack>
        </>
    );
}

export default function Header({
    isMobileSize,
    handleDrawerToggle,
    toggleDarkMode,
    darkMode
    }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const models = useSelector(selectAllModels);
    const selectedModel = useSelector(selectSelectedModel);
    const [editModelOpen, setEditModelOpen] = useState(false);
    const onSelectedNewModel = (e) => {
        dispatch(selectModelAndLoadVariables(e.target.value));
    }
    const onNewModelCancelled = () => {
        setEditModelOpen(false);
    }
    const onNewModelSaved = (model) => {
        const state = store.getState();
        dispatch(modelAdded({
            ...model,
            id: getNextModelId(state.models)
        }));
        setEditModelOpen(false);
    }
    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
                    {isMobileSize ? (
                        <MobileContent 
                        models={models}
                        selectedModel={selectedModel} 
                        onSelectedNewModel={onSelectedNewModel}
                        onNewModelCancelled={onNewModelCancelled} 
                        onNewModelSaved={onNewModelSaved} 
                        editModelOpen={editModelOpen} 
                        setEditModelOpen={setEditModelOpen}
                        toggleDarkMode={toggleDarkMode}
                        handleDrawerToggle={handleDrawerToggle}
                        darkMode={darkMode}
                        />
                    ) : (
                        <DesktopContent 
                        models={models}
                        selectedModel={selectedModel} 
                        onSelectedNewModel={onSelectedNewModel}
                        onNewModelCancelled={onNewModelCancelled} 
                        onNewModelSaved={onNewModelSaved} 
                        editModelOpen={editModelOpen} 
                        setEditModelOpen={setEditModelOpen}
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        />
                    )}
            </Toolbar>
        </AppBar>
    );
}
