import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ResultsTable from "./ResultsTable";
import WorldMap from "./WorldMap";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PublicIcon from "@mui/icons-material/Public";
import BarChartIcon from "@mui/icons-material/BarChart";
import BarChart from "./BarChart";

const TabBar = ({ tabHeadings, searchResults }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const geographicLocationsDict = {};
  // create a location_to_documents dictionary for each key in searchResults
  for (const heading of tabHeadings) {
    const searchResultsForHeading = searchResults[heading];
    const location_to_documents = {};
  
    for (const doc of searchResultsForHeading) {
      const locations = doc.geographic_locations;
  
      for (const location of locations) {
        if (location in location_to_documents) {
          location_to_documents[location].push(doc);
        } else {
          location_to_documents[location] = [doc];
        }
      }
    }
  
    geographicLocationsDict[heading] = location_to_documents;
  }

  //Toggle Graph
  const [displayMode, setDisplayMode] = useState(true);

  const toggleDisplayMode = () => {
    setDisplayMode(!displayMode);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
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
              <Box sx={{ height: "800px", bgcolor: "background.paper" }}>
                <ResultsTable results={searchResults[heading]} />
                <BarChartIcon onClick={toggleDisplayMode}></BarChartIcon>
                {displayMode ? (
                  <WorldMap continentCount={continentCount[heading]} locations={geographicLocationsDict[heading]} />
                ) : (
                  <BarChart continentCount={continentCount[heading]} locations={geographicLocationsDict[heading]}/>
                )}
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default TabBar;