import React, { useState } from "react";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, useTheme, FormControl } from "@mui/material";
import axios from "axios";

const SearchBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");


  const searchQuery = async () => {
    console.log("function called")
    await axios (
      {
        method: "POST",
        url: "http://127.0.0.1:8000/api/searchQuery/",
        data: search,
      }).then(response => response.json())
      .then((response) => console.log(response.data))
      .catch(error => console.log(error.response.data))
  }

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
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </FormControl>
      <IconButton type="button" sx={{ p: 1 }} onClick = {searchQuery}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
