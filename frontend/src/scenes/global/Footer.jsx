import React from "react";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Box } from "@mui/system";
const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0, backgroundColor: colors.primary[900]  }}>
      <Toolbar>
        <Box>
        <Typography variant="body1" color="inherit">
          2482581k - L4 Final Project
        </Typography>
        </Box>
        <Box>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
