import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Toolbar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MathJaxContext } from "better-react-mathjax";
import { Provider } from 'react-redux';
import { Stack } from "@mui/material";

import store from "./store";
import Content from "./Content/Content";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

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
                    <Header
                    isMobileSize={isMobileSize}
                    handleDrawerToggle={handleDrawerToggle}
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                    />
                    <Toolbar/>
                    <Stack direction="row" alignItems="stretch">
                        <Sidebar
                        handleDrawerClose={handleDrawerClose}
                        open={open}
                        setContent={setContent}
                        isMobileSize={isMobileSize}
                        />
                        <Content content={content} />
                    </Stack>

                    {/* <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <CssBaseline />
                        <Header
                        isMobileSize={isMobileSize}
                        handleDrawerToggle={handleDrawerToggle}
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        />
                        <Stack direction="row">
                            <Sidebar
                            handleDrawerClose={handleDrawerClose}
                            open={open}
                            setContent={setContent}
                            isMobileSize={isMobileSize}
                            />
                            <Content content={content} />
                        </Stack> */}
                        {/* <Sidebar
                        handleDrawerClose={handleDrawerClose}
                        open={open}
                        setContent={setContent}
                        isMobileSize={isMobileSize}
                        /> */}
                    {/* </Box> */}
                </ThemeProvider>
            </MathJaxContext>
        </Provider>
    );
}
