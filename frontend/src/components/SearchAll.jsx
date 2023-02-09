import React, { useState } from "react";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  useTheme,
  FormControl,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableVirtuoso } from "react-virtuoso";

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
      const rows = Array.from(JSON.parse(response.data));
      console.log(typeof rows);
      setSearchResults(rows);
      console.log(rows);
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

  const columns = [
    { id: "qid", label: "ID", minWidth: 50, align: "right" },
    { id: "docid", label: "Document\u00a0ID", minWidth: 75, align: "right" },
    {
      id: "title",
      label: "Document\u00a0Title",
      minWidth: 250,
      align: "right",
    },
    { id: "docno", label: "Document\u00a0No", minWidth: 50, align: "right" },
    { id: "rank", label: "Rank", minWidth: 50, align: "right" },
    { id: "score", label: "Score", minWidth: 170, align: "right" },
    { id: "query", label: "Query", minWidth: 50, align: "right" },
    {
      id: "geographic_locations",
      label: "Location",
      minWidth: 300,
      align: "right",
    },
    { id: "url", label: "url", minWidth: 300, align: "right" },
  ];

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: colors.primary[500],
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  let navigate = useNavigate();
  function handleRowClick(row) {
    navigate(`/doctext/${row.docid}`, { state: { text: row.text } });
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric || false ? "right" : "left"}
            sx={{
              backgroundColor: colors.primary[400],
            }}
          >
            {row[column.id]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} style={{ borderCollapse: "separate" }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => (
      <TableRow {...props} onClick={() => handleRowClick(_item)} />
    ),
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  return (
    <Box>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={{ m: 2 }}
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

      {searchResults.length !== 0 && (
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" color={colors.grey[200]}>
            Search Results
          </Typography>
          <Paper style={{ height: 400, width: "100%" }}>
            <TableVirtuoso
              data={searchResults}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SearchAll;
