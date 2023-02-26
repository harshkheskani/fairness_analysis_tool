import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ResultsTable from "./ResultsTable";
import WorldMap from "./WorldMap";

const TabBar = ({ tabHeadings, searchResults }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

const continentCount = {};

for (const [resultKey, resultValues] of Object.entries(searchResults)) {
  continentCount[resultKey] = {};

  for (const resultValue of resultValues) {
    for (const geographicLocation of resultValue.geographic_locations) {
      if (continentCount[resultKey][geographicLocation]) {
        continentCount[resultKey][geographicLocation] += 1;
      } else {
        continentCount[resultKey][geographicLocation] = 1;
      }
    }
  }
}


  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {tabHeadings.map((heading, index) => (
          <Tab key={index} label={heading} />
        ))}
      </Tabs>
      {searchResults &&
        tabHeadings.map((heading, index) => (
          <Box
            key={index}
            style={{ display: value === index ? "block" : "none" }}
          >
            {searchResults[heading] && (
              <Box>
                <ResultsTable results={searchResults[heading]} />
                <WorldMap continentCount={continentCount[heading]} />
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default TabBar;
