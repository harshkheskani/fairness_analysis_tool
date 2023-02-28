import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PublicIcon from '@mui/icons-material/Public';
import BarChartIcon from '@mui/icons-material/BarChart';
export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');
  const [graph, setGraph] = React.useState("map")
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned" >
        <PublicIcon onClick = {setGraph("map")}/>
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <BarChartIcon onClick = {setGraph("bar")}/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}