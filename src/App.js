import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Toolbar } from "@material-ui/core";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@material-ui/core";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MathJaxContext } from "better-react-mathjax";
import { Provider } from 'react-redux';
import store from "./store";

const drawerWidth = 240;

export default function App() {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [content, setContent] = useState("Dashboard");
    const theme = createTheme({
        palette: {
            type: darkMode ? "dark" : "light"
        }
    });
    const isMobileSize = !useMediaQuery(theme.breakpoints.up('sm'));

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
        <Provider store={store}>
            <MathJaxContext>
                <ThemeProvider theme={theme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Header
                        isMobileSize={isMobileSize}
                        handleDrawerToggle={handleDrawerToggle}
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        />
                        <Sidebar
                        handleDrawerClose={handleDrawerClose}
                        open={open}
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
                            <Content content={content} />
                        </Box>
                    </Box>
                </ThemeProvider>
            </MathJaxContext>
        </Provider>
    );
}
