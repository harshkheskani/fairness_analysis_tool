import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import TopicIcon from "@mui/icons-material/Topic";
import SearchAll from "../../components/SearchAll";
import axios from "axios";
import WorldMap from "../../components/WorldMap";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collectionStats, setCollectionStats] = useState([]);

  useEffect(() => {
    // The code inside this block will run as soon as the component is rendered 
    const getIndexStats = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://127.0.0.1:8000/api/indexStats/",
          responseType: "json",
        });
        console.log(response);
        const initialData = JSON.parse(response.data);
        setCollectionStats(initialData);
      } catch (error) {
        console.log(error);
      }
    };
    getIndexStats();
    console.log("The component has been rendered!");
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dataset #1" subtitle="Welcome to your dashboard" />
        <Box gridColumn="span 8" backgroundColor={colors.primary[400]}></Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Report
          </Button>
        </Box>
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
        {/* ROW 2 */}
      </Box>
      {/* Search */}
      <Box>
        <SearchAll />
      </Box>

      <Box
        gridColumn="span 10"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <WorldMap />
      </Box>

      {/* ROW 3 */}

      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Example Nivo Graph
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Some Total
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box height="250px" m="-20px 0 0 0">
          <LineChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
