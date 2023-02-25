import React, { useState } from "react";
import { tokens } from "../theme";
import SearchIcon from "@mui/icons-material/Search";
import WorldMap from "./WorldMap";
import ResultsTable from "./ResultsTable";
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
} from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";

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
      console.log(rows)
      setSearchResults(rows);
      const locationsCount = rows.reduce((acc, curr) => {
        curr.geographic_locations.forEach((location) => {
          if (acc[location]) {
            acc[location]++;
          } else {
            acc[location] = 1;
          }
        });
        return acc;
      }, {});
      console.log(locationsCount);
      setAllLocations(locationsCount);
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
  return (
    <Box>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 2 },
        }}
      >
        <FormControl>
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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Retrieval Model</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={chosenRetrievalModel}
            onChange={handleChange}
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

        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={() => {
            searchQuery({ searchTerm: searchInput, retrievalModels: chosenRetrievalModel });
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {searchResults.length !== 0 && (
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" color={colors.grey[200]}>
            Search Results
          </Typography>
          <ResultsTable results = {searchResults} />
        </Box>
      )}

      <Box
        gridColumn="span 10"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <WorldMap continentCount={allLocations} />
      </Box>
    </Box>
  );
};

export default SearchAll;
