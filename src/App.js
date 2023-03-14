import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, ThemeProvider, createTheme, Toolbar } from "@material-ui/core";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getData, formatData } from "./Utility";
import { Box } from "@material-ui/core";
import useMediaQuery from '@mui/material/useMediaQuery';

const loadedData = getData();
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState({});
    const [content, setContent] = useState("Dashboard");
    const theme = createTheme({
        palette: {
            type: darkMode ? "dark" : "light"
        }
    });
    const isMobileSize = !useMediaQuery(theme.breakpoints.up('sm'));
    
    useEffect(() => {
        setData(formatData(loadedData));
    }, []);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header
                handleDrawerToggle={handleDrawerToggle}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
                />
                <Sidebar
                handleDrawerClose={handleDrawerClose}
                open={open}
                setOpen={setOpen}
                setContent={setContent}
                isMobileSize={isMobileSize}
                />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, 
                        width: isMobileSize ? '100%' : { 
                            sm: `calc(100% - ${drawerWidth}px)` 
                        } }}
                >
                    <Toolbar/>
                    <Content data={data} setData={setData} content={content} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
