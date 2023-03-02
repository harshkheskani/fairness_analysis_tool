import React from "react";
import { scaleLinear } from "d3-scale";
const WorldMapLegend = () => {
const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#ffedea", "#ff5233"]);

const legends = colorScale.ticks(5).map((value, index) => {
  const color = colorScale(value);
  return (
    <div key={index}>
      <div>
        <span style={{ backgroundColor: colorScale(0) }}></span>
        <span>0%</span>
      </div>
      <div>
        <span style={{ backgroundColor: colorScale(25) }}></span>
        <span>25%</span>
      </div>
      <div>
        <span style={{ backgroundColor: colorScale(50) }}></span>
        <span>50%</span>
      </div>
      <div>
        <span style={{ backgroundColor: colorScale(75) }}></span>
        <span>75%</span>
      </div>
      <div>
        <span style={{ backgroundColor: colorScale(100) }}></span>
        <span>100%</span>
      </div>
    </div>
  );
});
}
 
export default WorldMapLegend;
