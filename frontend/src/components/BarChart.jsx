import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
const BarChart = ({ continentCount, locations, searchResults }) => {
  // Full data set: country count
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialData = [
    { name: "unknown", value: 2557234, percentage: 42.15 },
    { name: "Europe", value: 1289747, percentage: 21.26 },
    { name: "Northern America", value: 1134091, percentage: 18.69 },
    { name: "Asia", value: 600711, percentage: 9.9 },
    {
      name: "Latin America and the Caribbean",
      value: 185393,
      percentage: 3.06,
    },
    { name: "Oceania", value: 157943, percentage: 2.6 },
    { name: "Africa", value: 131603, percentage: 2.17 },
    { name: "Antarctica", value: 9626, percentage: 0.16 },
  ];

  const initialDataPerCent = [
    { name: "unknown", value: 42.15 },
    { name: "Europe", value: 21.26 },
    { name: "Northern America", value: 18.69 },
    { name: "Asia", value: 9.9 },
    {
      name: "Latin America and the Caribbean",

      value: 3.06,
    },
    { name: "Oceania", value: 2.6 },
    { name: "Africa", value: 2.17 },
    { name: "Antarctica", value: 0.16 },
  ];

  // Getting Ranks Per Continent
  const [ranksPerContinent, setRanksPercontinent] = useState([]);
  const [avgContinentRank, setAvgContinentRank] = useState([]);
  const [rankRangesPerContinent, setRankRangesPerContinent] = useState([]);
  const [lenContinent, setLenContinent] = useState([]);
  useEffect(() => {
    const continentRanks = [];
    const continentAverages = [];
    const rankRanges = [];
    const numDocs = [];
    if (locations && Object.keys(locations).length > 0) {
      Object.entries(locations).forEach(([continent, data]) => {
        const ranks = data.map((obj) => ({ name: obj.name, value: obj.rank }));
        if (ranks.length > 0) {
          const sum = ranks.reduce((total, rank) => total + rank.value, 0);
          const average = sum / ranks.length;
          continentAverages.push({
            name: continent,
            value: Number(average.toFixed(2)),
          });
          const low = Math.min(...ranks.map((rank) => rank.value));
          const high = Math.max(...ranks.map((rank) => rank.value));
          rankRanges.push({ name: continent, low: low, high: high });
        }
        continentRanks.push({ name: continent, value: ranks });
        numDocs.push({ name: continent, value: ranks.length });
      });
      setRanksPercontinent(continentRanks);
      setAvgContinentRank(continentAverages);
      setRankRangesPerContinent(rankRanges);
      setLenContinent(numDocs);
    }
  }, [locations]);
  console.log(lenContinent);
  // Calculate the Skew
  function skewness(data) {
    const values = data.map((item) => item.value); // extract the "value" property from each dictionary
    const n = values.length;
    const mean = values.reduce((acc, val) => acc + val, 0) / n;
    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const skewness =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) /
      (n * Math.pow(stdDev, 3));

    const skewData = skewness.toString(); // convert skewness to a string

    return skewData;
  }

  const [barChartData, setBarChartData] = useState(initialDataPerCent);
  const [searchDataDistribution, setSearchDataDistribution] = useState();
  const [expectedExposure, setExpectedExposure] = useState();

  function getPercentageByName(name) {
    const region = initialData.find((region) => region.name === name);
    return region ? region.percentage : null;
  }

  function updatingContinentCount() {
    const searchDistribution = [];
    const formattedMapData = [];
    const listExpectedExposure = [];
    const valueSum = Object.values(continentCount).reduce((a, b) => a + b, 0);
    for (let key in continentCount) {
      if (continentCount.hasOwnProperty(key)) {
        const searchRatio = continentCount[key] / valueSum;
        searchDistribution.push({
          name: key,
          value: Number((searchRatio * 100).toFixed(2)),
        });
        const fullDataSetRatio = getPercentageByName(key) / 100;
        const expectedExposure = Math.abs(searchRatio - fullDataSetRatio) * 100;
        listExpectedExposure.push({
          name: key,
          value: Number(expectedExposure.toFixed(2)),
        });
        // create a new object with the desired key names
        let newObj = {
          name: key,
          percentage: continentCount[key],
          value: expectedExposure.toFixed(2),
        };
        // append the new object to the array
        formattedMapData.push(newObj);
      }
    }
    setBarChartData(searchDistribution);
    setSearchDataDistribution(searchDistribution);
    setExpectedExposure(listExpectedExposure);
  }
  // updating map data
  useEffect(() => {
    if (Object.keys(continentCount || {}).length > 0) {
      updatingContinentCount();
    }
  }, [continentCount]);

  const [yAxisLabel, setYAxisLabel] = useState("Distribution (%)");
  const [barGraphTitle, setBarGraphTitle] = useState(
    "Search Result Distribution"
  );

  const [skewGraphData, setSkewGraphData] = useState(
    skewness(initialDataPerCent)
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="h2">{barGraphTitle}</Typography>
      </Box>
      {continentCount && locations && (
        <React.Fragment>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <ToggleButtonGroup exclusive aria-label="text alignment">
              <ToggleButton
                value="center"
                aria-label="centered"
                onClick={() => {
                  setBarChartData(searchDataDistribution);
                  setYAxisLabel("Distribution (%)");
                  setBarGraphTitle("Distribution of Search Results");
                  setSkewGraphData(skewness(searchDataDistribution));
                }}
              >
                <Typography>Distribution of Search</Typography>
              </ToggleButton>
              <ToggleButton
                value="center"
                aria-label="centered"
                onClick={() => {
                  setBarChartData(expectedExposure);
                  setYAxisLabel("Expected Exposure (%)");
                  setBarGraphTitle("Expected Exposure of Search Results");
                  setSkewGraphData(skewness(expectedExposure));
                }}
              >
                <Typography>Expected Exposure</Typography>
              </ToggleButton>
              <ToggleButton
                value="left"
                aria-label="left aligned"
                onClick={() => {
                  setBarChartData(avgContinentRank);
                  setYAxisLabel("Average Rank");
                  setBarGraphTitle("Average Ranks for Contients");
                  setSkewGraphData(skewness(avgContinentRank));
                }}
              >
                <Typography>Average Rank</Typography>
              </ToggleButton>
              <ToggleButton
                value="left"
                aria-label="left aligned"
                onClick={() => {
                  setBarChartData(lenContinent);
                  setYAxisLabel("Number of Documents");
                  setBarGraphTitle("Number of Documents per Continent");
                  setSkewGraphData(skewness(avgContinentRank));
                }}
              >
                <Typography>Number of Documents</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </React.Fragment>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="h5">{`Skew: ${skewGraphData}`}</Typography>
      </Box>

      <Box sx={{ height: "800px" }}>
        <ResponsiveBar
          data={barChartData}
          // zkeys={["Africa","Asia","unknown","Europe", "Latin America and the Caribbean", "Antarctica", "Northern America","Oceania"]}
          indexBy="name"
          margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
          padding={0.3}
          colors={colors.greenAccent[600]}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          axisLeft={{
            legend: `${yAxisLabel}`,
            legendPosition: "middle",
            legendOffset: -60,
          }}
          axisBottom={{
            legend: "Continent",
            legendPosition: "middle",
            legendOffset: 35,
          }}
        />
      </Box>
    </Box>
  );
};

export default BarChart;
