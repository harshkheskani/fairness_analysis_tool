import React from "react";
import { Box } from "@mui/material";
import { scaleLinear } from "d3-scale";
import { Typography } from "@mui/material";

const WorldMapLegend = () => {
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#dbf5ee", "#2e7c67"]);

  const legendItems = [];

  for (let i = 0; i <= 100; i += 10) {
    const style = {
      width: "15px",
      height: "15px",
      marginRight: "5px",
      backgroundColor: colorScale(i),
    };
    legendItems.push(
      <div key={i} style={{ display: "flex" }}>
        <span className="color-block" style={style}></span>
        <span><Typography variant="h5">{" " + i.toString() + "%" + " "}</Typography></span>
      </div>
    );
  }

  return <Box style={{ display: "flex" }}>Legend:  {legendItems}</Box>;
};



export default WorldMapLegend;
