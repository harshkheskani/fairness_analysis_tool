import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  //bool: true if sidebar is open
  const [openSidebar, setOpenSidebar] = useState(true);
  // check device 
  const mobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box display={mobile ? "block" : "flex"} width="100%" height="100%">
      <Sidebar mobile = {mobile} drawerWidth ="250px" openSidebar = {openSidebar} setOpenSidebar={setOpenSidebar} />
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
