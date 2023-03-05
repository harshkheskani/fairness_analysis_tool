import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { tokens } from "../theme";
import katex from "katex";

const RenderDocText = () => {
  const location = useLocation();
  const { html, title } = location.state;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to replace the LaTeX images with rendered LaTeX text
  const replaceImagesWithLatex = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find all the LaTeX images
    const images = doc.querySelectorAll("img[alt]");

    images.forEach((img) => {
      // Render the LaTeX text from the alt attribute
      const latexText = katex.renderToString(img.getAttribute("alt"), {
        throwOnError: false,
      });

      // Replace the image with the rendered LaTeX text
      img.outerHTML = latexText;
    });

    return doc.body.innerHTML;
  };

  const renderedHtml = replaceImagesWithLatex(html);

  return (
    <Box m={4}>
      <Box>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css"
          integrity="sha384-2UQF0HwKkU1v+jryfdNWXJyMj+D6mtbyLG6zEbh6UoJWy8/UtWcHvBnLmJ4mV7s4"
          crossOrigin="anonymous"
        ></link>
      </head>
      <Typography variant="body1" component="div" sx={{ typography: "body1" }}>
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </Typography>
    </Box>
  );
};

export default RenderDocText;
