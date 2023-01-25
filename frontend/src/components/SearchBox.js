import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
<Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
  <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
  <IconButton type="button" sx={{ p: 1 }}>
    <SearchIcon />
  </IconButton>
</Box>;
