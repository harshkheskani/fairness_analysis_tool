import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

function Layout() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
  );
}



// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <MenuItem
//       active={selected === title}
//       style={{
//         color: colors.grey[100],
//       }}
//       onClick={() => setSelected(title)}
//       icon={icon}
//     >
//       <Typography>{title}</Typography>
//       <Link to={to} />
//     </MenuItem>
//   );
// };

// const Sidebar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");
  
//   return (
//     <Box  display = "flex"  >
//       <Sidebar collapsed={isCollapsed}>
//         <Menu iconShape="square">
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//             style={{
//               margin: "10px 0 20px 0",
//               color: colors.grey[100],
//             }}
//           >
//             {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Typography variant="h3" color={colors.grey[100]}>
//                   Placeholder
//                 </Typography>
//                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>

//           {/* Sidebar Items */}
//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             <Item 
//               title = "Homepage"
//               to = "/"
//               icon = {<HomeOutlinedIcon />}
//               selected = {selected}
//               setSelected = {setSelected}
//             />
//             <Item 
//               title = "Instructions"
//               to = "/"
//               icon = {<MapOutlinedIcon />}
//               selected = {selected}
//               setSelected = {setSelected}
//             />
//               <Item 
//               title = "Datasets"
//               to = "/"
//               icon = {<DatasetOutlinedIcon />}
//               selected = {selected}
//               setSelected = {setSelected}
//             />
//           </Box>
//         </Menu>
//       </Sidebar>
//     </Box>
//   );
// };

export default Sidebar;
