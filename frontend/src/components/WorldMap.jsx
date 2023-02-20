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
import worldContinentsTopoJSON from "../data/world-continents.json";


const WorldMap = ({ continentCount }) => {
  const [data, setData] = useState({ continentCount });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const newTotal = Object.values(data).reduce((acc, val) => acc + val, 0);
      setTotal(newTotal);
      console.log(total);
    }
  }, [data]);


  const initialData = [
    { name: 'unknown', value: 2557234 },
    { name: 'Europe', value: 1289747 },
    { name: 'Northern America', value: 1134091 },
    { name: 'Asia', value: 600711 },
    { name: 'Latin America and the Caribbean', value: 185393 },
    { name: 'Oceania', value: 157943 },
    { name: 'Africa', value: 131603 },
    { name: 'Antarctica', value: 9626 },
  ];
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography={worldContinentsTopoJSON}>
        {({ geographies }) =>
          geographies.map((continent) => (
            <Geography
              geography={continent}
              key={continent.properties.continent}
              // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;
