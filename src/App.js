import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getData, formatData } from "./Utility";
import { Box } from "@material-ui/core";

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
  const [contentWidth, setContentWidth] = useState(`calc(100vw - ${open ? drawerWidth : 0}px - 50px)`) // There is a fudge factor of 50px - not sure why it is needed

  useEffect(() => {
    setData(formatData(loadedData));
  }, []);

  const handleDrawerToggle = () => {
    setContentWidth(`calc(100vw - ${!open ? drawerWidth : 0}px - 50px)`);
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header
          handleDrawerToggle={handleDrawerToggle}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <Sidebar
          handleDrawerClose={handleDrawerClose}
          open={open}
          setContent={setContent}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Box width={contentWidth}>
            <Content data={data} setData={setData} content={content} />
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}
