import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { feature } from "topojson-client";
import worldContinentsTopoJSON from "../data/world-continents.json";

const WorldMap = () => {
  return (

    <ComposableMap>
      <ZoomableGroup zoom={1}>
        <Geographies geography ={worldContinentsTopoJSON}>
          {({ geographies }) =>
            geographies.map((continent) => (
              <Geography
                geography={continent}
                key={continent.id}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default WorldMap;
