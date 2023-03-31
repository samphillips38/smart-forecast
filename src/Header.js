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
import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';

import { selectDisplayingInvestment } from "./investmentsReducer";
import { Button } from "@mui/material";

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
    const investment = useSelector(selectDisplayingInvestment);
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
            <Stack spacing={2} direction="row">
                <Typography variant="h6" noWrap>
                {isMobileSize ? "SF" : "Smart Forecast"}
                </Typography>
                {investment && investment.status == "idle" && (
                    <Button 
                    color="inherit" 
                    variant="outlined"
                    display={{marginLeft: 0.5}}>Refresh</Button>
                )}
            </Stack>
            <div className={classes.spacer} />
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
        </Toolbar>
        </AppBar>
    );
}
