import React from "react";
import { TableVirtuoso } from "react-virtuoso";
import axios from "axios";
import { tokens } from "../theme";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useTheme,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResultsTable = ({ results }) => {
  // Theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Wiki API calls
  const renderWikitext = async (wikitext) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/enwiki/v1/transform/wikitext/to/html?wikitext=${encodeURIComponent(
          wikitext
        )}`
      );
      return response.data.html;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  let navigate = useNavigate();

  const getWikipediaPage = async (row) => {

    try {
      const response = await axios({
        method: "GET",
        url: `https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=${row.title}&format=json`,
      });

      const html = response.data.parse.text["*"];
      if (html !== "") {
        navigate(`/doctext/${row.docid}`, { state: { html } });
      }
    } catch (err) {
      console.log(err);
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
      <TableRow {...props} onClick={() => getWikipediaPage(_item)} />
    ),
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  return (
    <Box>
      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={results}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
};

export default ResultsTable;
