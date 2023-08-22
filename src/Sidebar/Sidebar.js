import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";
import CalculateIcon from "@mui/icons-material/Calculate";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
const drawerWidth = 240;

export default function ({ window, open, handleDrawerClose, setContent, isMobileSize }) {
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
                <ListItem  onClick={() => setContent("Model Map")}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Model Map" />
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
            {/* <List>
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
            </List> */}
        </div>
    )

    // const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box
            component="nav"
            width={isMobileSize ? 0 : drawerWidth}
            aria-label="Sidebar"
            onClick={handleDrawerClose}
            flexShrink={0}
        >
            {isMobileSize ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {menuItemList}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    width={drawerWidth}
                >
                    {menuItemList}
                </Drawer>
            )}
        </Box>
    );
}
