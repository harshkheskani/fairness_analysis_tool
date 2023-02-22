import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const RenderDocText = () => {
  const location = useLocation();
  const { html } = location.state;
  console.log(html);
  const whiteLatex = html.replace(/\$.*?\$/g, match => `<span style="color: white;">${match}</span>`);
  return (
    <Box>
      <Typography variant="body1" component="div" sx={{ typography: "body1" }}>
        <div dangerouslySetInnerHTML={{ __html: whiteLatex }} />
      </Typography>
    </Box>
  );
};

export default RenderDocText;
