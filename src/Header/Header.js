import React from "react";
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

import { selectSelectedModel, selectModels, selectSelectedModel } from "../modelsReducer";

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

export default function Header({
    isMobileSize,
    handleDrawerToggle,
    toggleDarkMode,
    darkMode
    }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const models = useSelector(selectModels);
    const selectedModel = useSelector(selectSelectedModel);
    const onSelectedNewModel = (modelId) => {
        dispatch(selectSelectedModel(modelId));
    }
    return (
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
            {isMobileSize && (
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                    display: { xs: 'block', sm: 'none' }
                    }}
                >
                        <MenuIcon />
                </IconButton>
            )}
            <Typography variant="h6" noWrap>
                {isMobileSize ? "MC" : "Model Creator"}
            </Typography>
            <div className={classes.spacer} />
            <Stack spacing={2} direction="row" alignItems="center">
                <Box sx={{ minWidth: 140}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="model-select-label">Model</InputLabel>
                        <Select
                        labelId="model-select-label"
                        id="model-select"
                        value={selectedModel.name}
                        label="Age"
                        onChange={onSelectedNewModel}
                        >
                            {models.map((model) => (
                                <MenuItem value={model.id}>{model.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Button
                color="inherit"
                variant="outlined"
                >
                    <AddIcon/>
                    New Model</Button>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDarkMode}
                edge="start"
                className={classes.rightIcons}
                >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                className={classes.rightIcons}
                >
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                className={classes.rightIcons}
                >
                <AccountCircleIcon />
                </IconButton>
            </Stack>
        </Toolbar>
        </AppBar>
    );
}
