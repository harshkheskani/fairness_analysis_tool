import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { Box, Typography } from "@mui/material";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import continentsFile from "../data/merged_ocean_continents_geojson.json";
import WorldMapLegend from "./WorldMapLegend";
import { styled } from "@mui/material/styles";

const WorldMap = ({ continentCount, locations }) => {
  // Full data set: country count
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

  const [graphTitle, setGraph] = useState("Distribution of Dataset");

  function getPercentageByName(name) {
    const region = initialData.find((region) => region.name === name);
    return region ? region.percentage : null;
  }
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

  // updating map data
  const [mapPercentageData, setMapPercentageData] = useState(initialData);
  useEffect(() => {
    if (Object.keys(continentCount || {}).length > 0) {
      const formattedMapData = [];
      const valueSum = Object.values(continentCount).reduce((a, b) => a + b, 0);
      for (let key in continentCount) {
        if (continentCount.hasOwnProperty(key)) {
          const searchRatio = continentCount[key] / valueSum;
          const fullDataSetRatio = getPercentageByName(key) / 100;
          const expectedExposure =
            Math.abs(searchRatio - fullDataSetRatio) * 100;
          // create a new object with the desired key names
          let newObj = {
            name: key,
            value: continentCount[key],
            percentage: expectedExposure.toFixed(2),
          };
          // append the new object to the array
          formattedMapData.push(newObj);
        }
      }
      setMapPercentageData(formattedMapData);
    }
  }, [continentCount]);

  // Color Scale for maps
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#dbf5ee", "#2e7c67"]);

  const [tooltipContent, setTooltipContent] = useState("");
  // Function to obtain information on Hover:- Add a second argument to the `handleMouseEnter` function to receive the `geo` object
  const handleMouseEnter = (event, geo) => {
    const { CONTINENT } = geo.properties;
    // Get the data for the hovered-over geography
    const d = mapPercentageData.find((s) => s.name === CONTINENT);
    // const avgRank = avgContinentRank.find((s) => s.name === CONTINENT)
    // Set the tooltip content to the name and percentage of the geography

    setTooltipContent(`${CONTINENT}: ${d ? d.percentage : "N/A"}%`);
  };

  // Function to reset the tooltip
  const handleMouseLeave = () => {
    setTooltipContent("");
  };
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#e0e0e0",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const [worldMapDescription, setWorldMapDescription] = useState(
    "The world choropleth map displays the data distribution across various geographic locations, over the whole dataset"
  );

  return (
    <Box>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "-150px",
        }}
      >
        <Typography variant="h2">{graphTitle}</Typography>
        <Typography variant="h5">{worldMapDescription}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {locations && continentCount ? (
            <Geographies geography={continentsFile}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = mapPercentageData.find(
                    (s) => s.name === geo.properties.CONTINENT
                  );
                  const avg = avgContinentRank.find(
                    (s) => s.name === geo.properties.CONTINENT
                  );
                  const ranks = rankRangesPerContinent.find(
                    (s) => s.name === geo.properties.CONTINENT
                  );
                  setWorldMapDescription(
                    "The world choropleth map depicts the data distribution, along with highest, lowest and average rank, as well as expected exposure, for each geographic location over the search results"
                  );
                  return (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography>
                            <em>
                              <b>{geo.properties.CONTINENT}</b>
                            </em>
                          </Typography>
                          <Typography>
                            <b>Expected Exposure: </b>
                            {d ? d.percentage : "N/A"}%
                          </Typography>
                          <Typography>
                            <b>Average Rank: </b>
                            {avg ? avg.value : "N/A"}
                          </Typography>
                          <Typography>
                            <b>Highest Rank: </b>
                            {ranks ? ranks.high : "N/A"}
                          </Typography>
                          <Typography>
                            <b>Lowest Rank: </b>
                            {ranks ? ranks.low : "N/A"}
                          </Typography>
                        </React.Fragment>
                      }
                      key={geo.properties.CONTINENT}
                    >
                      <Geography
                        geography={geo}
                        key={geo.properties.CONTINENT}
                        fill={d ? colorScale(d["percentage"]) : "#F5F4F6"}
                        stroke="#D6D6DA"
                        // Pass a lambda function to the `onMouseEnter` event to pass the `geo` object to `handleMouseEnter`
                        onMouseEnter={(event) => handleMouseEnter(event, geo)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            fill: "#2e7c67",
                            outline: "none",
                          },
                        }}
                      />
                    </HtmlTooltip>
                  );
                })
              }
            </Geographies>
          ) : (
            <Geographies geography={continentsFile}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = mapPercentageData.find(
                    (s) => s.name === geo.properties.CONTINENT
                  );
                  return (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography>
                            <em>
                              <b>{geo.properties.CONTINENT}</b>
                            </em>{" "}
                          </Typography>
                          <Typography>
                            <b>Actual exposure: </b>
                            {d ? d.percentage : "N/A"}%
                          </Typography>
                        </React.Fragment>
                      }
                      key={geo.properties.CONTINENT}
                    >
                      <Geography
                        geography={geo}
                        key={geo.properties.CONTINENT}
                        fill={d ? colorScale(d["percentage"]) : "#F5F4F6"}
                        stroke="#D6D6DA"
                        // Pass a lambda function to the `onMouseEnter` event to pass the `geo` object to `handleMouseEnter`
                        onMouseEnter={(event) => handleMouseEnter(event, geo)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            fill: "#2e7c67",
                            outline: "none",
                          },
                        }}
                      />
                    </HtmlTooltip>
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-100px",
        }}
      >
        <WorldMapLegend />
      </Box>
    </Box>
  );
};

export default WorldMap;
