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
import { TableVirtuoso } from "react-virtuoso";


const SearchAll = () => {
  const columns = [
    { id: "qid", label: "ID", minWidth: 100, align: "right" },
    { id: "docid", label: "Document\u00a0ID", minWidth: 170, align: "right" },
    { id: "docno", label: "Document\u00a0No", minWidth: 170, align: "right" },
    { id: "rank", label: "Rank", minWidth: 100, align: "right" },
    { id: "score", label: "Score", minWidth: 170, align: "right" },
    { id: "query", label: "Query", minWidth: 170, align: "right" },
    {
      id: "geographic_locations",
      label: "Location",
      minWidth: 170,
      align: "right",
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

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
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
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
        sx = {{m: 2}}
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
        <Box sx = {{m:2}}>
          <Typography variant="h4" color={colors.greenAccent[500]}>Search Results</Typography>
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