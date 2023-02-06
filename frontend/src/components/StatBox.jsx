import { Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";
import React, { useState, useEffect } from "react";


const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [indexStats, setIndexStats] = useState([])
  
 
    // const getIndexStats = async () => {
    //   try {
    //     const response = await axios({
    //       method: "GET",
    //       url: "http://127.0.0.1:8000/api/indexStats/",
    //       responseType: "json",
    //     });
    //     const rows = Array.from(JSON.parse(response.data));
    //     console.log(typeof(rows));
    //     setIndexStats(rows);
    //     console.log(rows);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };


  // useEffect( () => {
  //   getIndexStats()
  // }, [])

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>

      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};


export default StatBox;
