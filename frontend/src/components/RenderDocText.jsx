import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown';


const RenderDocText = () => {
  const location = useLocation();
  const { searchBody } = location.state;


  return (
    <Box>
    <ReactMarkdown>{searchBody}</ReactMarkdown>
    </Box>
  );
};

export default RenderDocText;
