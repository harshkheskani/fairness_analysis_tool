import React, { useState } from "react";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, useTheme, FormControl } from "@mui/material";
import axios from "axios";


const SearchBar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([]);

  const searchQuery = async (searchObj) => {;
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/searchQuery/",
      data: searchObj,
    })
      .then((response) => console.log(response.data))
      .then((response) => setSearchResults(response))
      .catch((error) => console.log(error));
  };

  return (
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="3px"
    >
      <FormControl>
        <InputBase
          type="text"
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          name="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </FormControl>
      <IconButton
        type="button"
        sx={{ p: 1 }}
        onClick={() => {
          searchQuery({ searchTerm: searchInput });
        }}
      >
        <SearchIcon />
      </IconButton>

    </Box>

    // Rendering Results
  );
};

export default SearchBar;
