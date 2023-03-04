import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ResultsTable from "./ResultsTable";
import WorldMap from "./WorldMap";

import BarChart from "./BarChart";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PublicIcon from "@mui/icons-material/Public";
import BarChartIcon from "@mui/icons-material/BarChart";


const TabBar = ({ tabHeadings, searchResults }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{ backgroundColor: colors.primary[500] }}
      >
        {tabHeadings.map((heading, index) => (
          <Tab key={index} label={heading} sx={{ color: "white" }} />
        ))}
      </Tabs>
      {searchResults &&
        tabHeadings.map((heading, index) => (
          <Box
            key={index}
            style={{
              display: value === index ? "block" : "none",
              bgcolor: "background.paper",
            }}
          >
            {searchResults[heading] && (
              <Box sx={{ height: "1500px", bgcolor: "background.paper" }}>
                <ResultsTable results={searchResults[heading]} sx = {{m:2}} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px"}}>
                <ToggleButtonGroup
                  value={displayMode}
                  exclusive
                  onChange={toggleDisplayMode}
                  aria-label="text alignment"
                >
                  <ToggleButton value="left" aria-label="left aligned">
                    <PublicIcon onClick={toggleDisplayMode} />
                  </ToggleButton>
                  <ToggleButton value="center" aria-label="centered">
                    <BarChartIcon onClick={toggleDisplayMode} />
                  </ToggleButton>
                </ToggleButtonGroup>
                </Box>
                {displayMode ? (
                  <WorldMap
                    continentCount={continentCount[heading]}
                    locations={geographicLocationsDict[heading]}
                  />
                ) : (
                  <BarChart
                    continentCount={continentCount[heading]}
                    searchResults={searchResults[heading]}
                    locations={geographicLocationsDict[heading]}
                  />
                )}
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default TabBar;
