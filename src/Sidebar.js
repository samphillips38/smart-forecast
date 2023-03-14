import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DevicesIcon from "@material-ui/icons/Devices";
import EventIcon from "@material-ui/icons/Event";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";
import CalculateIcon from "@mui/icons-material/Calculate";
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function ({ window, open, setOpen, handleDrawerClose, setContent }) {
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };

    const menuItemList = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => setContent("Dashboard")}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => setContent("Add Variable")}>
                    <ListItemIcon>
                        <CalculateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Variable" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Scenarios" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Optimisations" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExploreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sensitivity Analysis" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <DevicesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Devices" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </div>
    )

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {menuItemList}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {menuItemList}
            </Drawer>
        </Box>
    );
}
