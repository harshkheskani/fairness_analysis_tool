import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { tokens } from "../../theme";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
        <Box display="flex">
        {(location.pathname === "/dashboard" || location.pathname.startsWith("/doctext")) && (
          <Typography variant="h2" color={colors.grey[100]} fontWeight="400" onClick={handleClick}>
            FairLens
          </Typography>
            )}
        </Box>
 

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

      </Box>
    </Box>
  );
};

export default Topbar;
