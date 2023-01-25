import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const sidebarMenu = [
  { text: "Home", icon: <HomeOutlinedIcon /> },
  { text: "Instructions", icon: <MapOutlinedIcon /> },
  { text: "Datasets", icon: <DatasetOutlinedIcon /> },
];
const Sidebar = () => {
  const Sidebar = ({ mobile, drawerWidth, openSidebar, setOpenSidebar }) => {
    const { path } = useLocation();
    const [currentPage, setCurrentPage] = useState("");
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
      setCurrentPage(path.substring(1));
    }, [path]);

    return (
      <Box component="nav">
        {openSidebar && (
          <Drawer
            onOpen={openSidebar}
            onClose={() => setOpenSidebar(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                width: drawerWidth,
                borderWidth: mobile ? "2px" : 0,
              },
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                      PLACEHOLDER
                    </Typography>
                  </Box>
                  {!mobile && (
                    <IconButton onClick={() => setOpenSidebar(!setOpenSidebar)}>
                      <KeyboardDoubleArrowLeftIcon />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {sidebarMenu.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lowerCaseText = text.toLowerCase();
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lowerCaseText}`);
                        }}
                        sx={{
                          backgroundColor:
                            currentPage === lowerCaseText
                              ? theme.palette.secondary[300]
                              : "transparent",
                            color: 
                              currentPage === lowerCaseText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        setCurrentPage(lowerCaseText);
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              currentPage === lowerCaseText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text}></ListItemText>
                        {currentPage === lowerCaseText && (
                            <KeyboardDoubleArrowLeftIcon sx = {{ml: "auto"}}/>
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        )}
      </Box>
    );
  };
};

export default Sidebar;
