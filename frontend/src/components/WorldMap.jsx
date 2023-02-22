import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { feature } from "topojson-client";
import oceanTopoJsonFile from "../data/merged_ocean_continents_geojson.json";
import continentsFile from "../data/continents.json";
import Tooltip from "@mui/material/Tooltip";

const WorldMap = ({ continentCount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Full data set: country count
  const initialData = [
    { name: "unknown", value: 2557234, percentage: 42.15 },
    { name: "Europe", value: 1289747, percentage: 21.26 },
    { name: "Northern America", value: 1134091, percentage:  18.69 },
    { name: "Asia", value: 600711, percentage: 9.90 },
    { name: "Latin America and the Caribbean", value: 185393, percentage: 3.06 },
    { name: "Oceania", value: 157943, percentage: 2.60 },
    { name: "Africa", value: 131603, percentage: 2.17},
    { name: "Antarctica", value: 9626, percentage: 0.16 },
  ];

  function getPercentageByName(name) {
    const region = initialData.find(region => region.name === name);
    return region ? region.percentage : null;
  }

  // updating map data
  const [mapPercentageData, setMapPercentageData] = useState(initialData);
  useEffect(() => {
    if (Object.keys(continentCount).length > 0) {
      const formattedMapData = [];
      const valueSum = Object.values(continentCount).reduce((a, b) => a + b, 0);
      for (let key in continentCount) {
        if (continentCount.hasOwnProperty(key)) {
          const searchPercentage = (continentCount[key] / valueSum) * 100;
          const expectedExposure = (searchPercentage / getPercentageByName(key)) * 100
          console.log(continentCount[key])
          // create a new object with the desired key names
          let newObj = {
            name: key,
            value: continentCount[key],
            percentage: expectedExposure.toFixed(2),
            // expectedExposure: expectedExposure.toFixed(2),
          };
          // append the new object to the array
          formattedMapData.push(newObj);
        }
      }
      setMapPercentageData(formattedMapData);
    }
  }, [continentCount]);

  console.log(mapPercentageData)

  // Color Scale for maps
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"]);

  const [tooltipContent, setTooltipContent] = useState("");
  // Function to obtain information on Hover:- Add a second argument to the `handleMouseEnter` function to receive the `geo` object
  const handleMouseEnter = (event, geo) => {
    const { CONTINENT } = geo.properties;
    // Get the data for the hovered-over geography
    const d = mapPercentageData.find((s) => s.name === CONTINENT);
    // Set the tooltip content to the name and percentage of the geography
    
    setTooltipContent(`${CONTINENT}: ${d ? d.percentage : "N/A"}%`);
  };

  // Function to reset the tooltip
  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography={continentsFile}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = mapPercentageData.find(
              (s) => s.name === geo.properties.CONTINENT
            );
            return (
              <Tooltip
                title={`${geo.properties.CONTINENT}: ${
                  d ? d.percentage : "N/A"
                }%`}
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
                      fill: "#F53",
                      outline: "none",
                    },
                  }}
                />
              </Tooltip>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;
