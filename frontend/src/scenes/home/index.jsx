import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ReactiveButton from "reactive-button";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const navigate = useNavigate();
  const [state, setState] = useState("idle");
  const onClickHandler = () => {
    setState("loading");

    // send an HTTP request
    setTimeout(() => {
      setState("success");
      navigate("/dashboard");
    }, 2000);
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="150px"
      >
        <Typography variant="h1" color={colors.grey[100]} fontWeight="600">
          {" "}
          FairLens{" "}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        marginTop="100px"
        
      >
        <Typography variant="h3">
          FairLens is a web application designed for Fairness Analysts to
          explore and analyze <br />
          the TREC21 dataset, with interactive data visualizations that <br />{" "}
          enable deeper insights into fairness metrics and model performance.
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        marginTop="100px"
      >
        <ReactiveButton
          color="red"
          buttonState={state}
          idleText="Submit"
          loadingText="Loading"
          successText="Done"
          onClick={onClickHandler}
          style={{ fontSize: '20px', padding: '30px 60px' }}
        />
      </Box>

    </Box>
  );
};

export default HomePage;
