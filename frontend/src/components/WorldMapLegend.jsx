import React from "react";
import { Box } from "@mui/material";
import { scaleLinear } from "d3-scale";

const WorldMapLegend = () => {
  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#ffedea", "#ff5233"]);



  const legendItems = [];

  for (let i = 0; i <= 100; i += 10) {
    const style = {
      display: "inline-block",
      width: "15px",
      height: "15px",
      marginRight: "5px",
      backgroundColor: colorScale(i),
    };
    legendItems.push(
      <div key={i}>
        <span className="color-block" style={style}></span>
        <span>{i.toString() + "%"}</span>
      </div>
    );
  }

  return <Box>{legendItems}</Box>;
};
export default WorldMapLegend;