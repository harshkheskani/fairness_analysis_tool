import React from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
    return (
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            Copyright © 2023 My Website
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Footer;
