import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";

import StatBox from "../../components/StatBox";
import TopicIcon from "@mui/icons-material/Topic";
import SearchAll from "../../components/SearchAll";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h2" component="h1">
            TREC21
          </Typography>
          <Typography variant="h4">Welcome to your Dashboard</Typography>
        </Box>
        <Box gridColumn="span 8" backgroundColor={colors.primary[400]}></Box>
        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6,280,328"
            subtitle="Number of Documents"
            progress="0.75"
            increase=""
            icon={
              <ArticleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3,873,118"
            subtitle="Number of Terms"
            progress="0.2"
            increase=""
            icon={
              <PublicIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="453,365,687"
            subtitle="Number of Postings"
            progress="0.30"
            increase=""
            icon={
              <TopicIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="661,458,642"
            subtitle="Number of Tokens"
            progress="0.30"
            increase=""
            icon={
              <TopicIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      {/* Search */}
      <Box>
        <SearchAll />
      </Box>

      {/* ROW 3 */}

      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >

      </Box>
    </Box>
  );
};

export default Dashboard;
