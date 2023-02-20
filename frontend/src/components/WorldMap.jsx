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

  //search query counts
  const [data, setData] = useState({ continentCount });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const newTotal = Object.values(data).reduce((acc, val) => acc + val, 0);
      setTotal(newTotal);
      console.log(total);
    }
  }, [data]);

  // Full data set: country count
  const initialData = [
    { name: "unknown", value: 2557234 },
    { name: "Europe", value: 1289747 },
    { name: "North America", value: 1134091 },
    { name: "Asia", value: 600711 },
    { name: "Latin America and the Caribbean", value: 185393 },
    { name: "Oceania", value: 157943 },
    { name: "Africa", value: 131603 },
    { name: "Antarctica", value: 9626 },
  ];

  // Convert country counts, convert percentage
  const totalCount = initialData.reduce((sum, { value }) => sum + value, 0);
  const dataPercentage = initialData.map(({ name, value }) => ({
    name,
    percentage: (value / totalCount) * 100,
  }));

  // Color Scale for maps
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"]);

  const [tooltipContent, setTooltipContent] = useState("");
  // Function to obtain information on Hover:- Add a second argument to the `handleMouseEnter` function to receive the `geo` object
  const handleMouseEnter = (event, geo) => {
    const { CONTINENT } = geo.properties;
    // Get the data for the hovered-over geography
    const d = dataPercentage.find((s) => s.name === CONTINENT);
    console.log(d);
    // Set the tooltip content to the name and percentage of the geography
    setTooltipContent(`${CONTINENT}: ${d ? d.percentage.toFixed(2) : "N/A"}%`);
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
      {/* {renderTooltip()} */}
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography={continentsFile}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = dataPercentage.find(
              (s) => s.name === geo.properties.CONTINENT
            );
            return (
              <Tooltip
                title={`${geo.properties.CONTINENT}: ${d ? d.percentage.toFixed(2) : "N/A"}%`}
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
