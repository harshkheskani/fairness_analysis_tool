import React, { useState } from "react";
import { tokens } from "../theme";
import SearchIcon from "@mui/icons-material/Search";
import WorldMap from "./WorldMap";
import TabBar from "./TabBar";
import {
  Box,
  IconButton,
  useTheme,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  CircularProgress,
  TextField,
  Button
} from "@mui/material";
import axios from "axios";
import BarChart from "./BarChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PublicIcon from "@mui/icons-material/Public";
import BarChartIcon from "@mui/icons-material/BarChart";

const SearchAll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const searchQuery = async (searchObj) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/searchQuery/",
        data: searchObj,
        responseType: "json",
      });
      const rows = response.data;
      console.log(rows);
      setSearchResults(rows);
    } catch (error) {
      console.log(error);
    }
  };

  // Retrievel model selection
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ["TF-IDF", "BM25", "PL2"];

  function getStyles(name, chosenRetrievalModel, theme) {
    return {
      fontWeight:
        chosenRetrievalModel.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [chosenRetrievalModel, setChosenRetrievalModel] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setChosenRetrievalModel(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //Loading
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    searchQuery({
      searchTerm: searchInput,
      retrievalModels: chosenRetrievalModel,
    }).then(() => {
      setLoading(false);
    });
  };

  //Bar Chart
  //Toggle Graph
  const [displayMode, setDisplayMode] = useState(true);

  const toggleDisplayMode = () => {
    setDisplayMode(!displayMode);
  };
  console.log(displayMode);

  return (
    <Box sx={{ m: 2 }}>
      <Box
        display="flex"
        backgroundColor="transparent"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // add this line
          "& > :not(style)": { m: 2 },
        }}
      >
        <FormControl sx={{ width: 275 }}>
          <TextField
            id="demo-helper-text-aligned-no-helper"
            label="Search"
            type="text"
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-multiple-chip-label">Retrieval Model</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={chosenRetrievalModel}
            onChange={handleChange}
            variant="standard"
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Retrievel Model"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, chosenRetrievalModel, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton type="button" sx={{ p: 1 }} onClick={handleClick}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: colors.redAccent[500] }} />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
      </Box>

      <Box
        gridColumn="span 10"
        gridRow="span 2"
        backgroundColor="transparent"
        overflow="auto"
        marginTop="-180px"
        sx={{ m: 2 }}
      >
        {Object.keys(searchResults).length > 0 ? (
          <TabBar
            tabHeadings={chosenRetrievalModel}
            searchResults={searchResults}
          />
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <ToggleButtonGroup
                value={displayMode ? "map" : "chart"}
                exclusive
                onChange={toggleDisplayMode}
                aria-label="text alignment"
              >
                <ToggleButton value="map" aria-label="left aligned">
                  <PublicIcon onClick={() => {toggleDisplayMode()}} />
                </ToggleButton>
                <ToggleButton value="chart" aria-label="centered">
                  <BarChartIcon onClick={ () => {toggleDisplayMode()}} />
                </ToggleButton>
              </ToggleButtonGroup>

            </Box>
            <Box
              sx={{
                marginTop: "-10px",
                height: "1500px",
              }}
            > 
              {displayMode ? <WorldMap /> : <BarChart />}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchAll;
