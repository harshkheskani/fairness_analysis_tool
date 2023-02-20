import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
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

const WorldMap = ({ continentCount }) => {
  // const [data, setData] = useState({ continentCount });
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   if (data && Object.keys(data).length > 0) {
  //     const newTotal = Object.values(data).reduce((acc, val) => acc + val, 0);
  //     setTotal(newTotal);
  //     console.log(total);
  //   }
  // }, [data]);

  const initialData = [
    // { name: "unknown", value: 2557234 },
    { name: "Europe", value: 1289747 },
    { name: "North America", value: 1134091 },
    { name: "Asia", value: 600711 },
    { name: "Latin America and the Caribbean", value: 185393 },
    { name: "Oceania", value: 157943 },
    { name: "Africa", value: 131603 },
    { name: "Antarctica", value: 9626 },
  ];

  const total = initialData.reduce((sum, { value }) => sum + value, 0);
  const dataPercentage = initialData.map(({ name, value }) => ({
    name,
    percentage: (value / total) * 100,
  }));

  const colorScale = scaleLinear().domain([0, 100]).range(["#ffedea", "#ff5233"]);

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
          geographies.map((continent) => {
            const d = dataPercentage.find(
              (s) => s.name === continent.properties.CONTINENT
            );
            console.log(d)
            return (
              <Geography
                geography={continent}
                key={continent.properties.CONTINENT}
                fill={d ? colorScale(d["percentage"]) : "#F5F4F6"}
                stroke="#D6D6DA"
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;
