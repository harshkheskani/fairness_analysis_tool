import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const RenderDocText = () => {
  const location = useLocation();

  return (
    <Box>
      {location.state && location.state.text ? (
        <div>{location.state.text}</div>
      ) : (
        <div>Text not found</div>
      )}
    </Box>
  );
};

export default RenderDocText;
