// import { Box } from "@mui/material";
// import React from "react";
// import { useParams } from "react-router-dom";

// const RenderDocText = (props) => {
//     const text = props.location.state.text;
    

//   return <Box>{text}</Box>;
// };

// export default RenderDocText;
import React from "react";
import { useLocation } from "react-router-dom";

const RenderDocText = () => {
  const location = useLocation();

  return (
    <div>
      {location.state && location.state.text ? (
        <div>{location.state.text}</div>
      ) : (
        <div>Text not found</div>
      )}
    </div>
  );
};

export default RenderDocText;
