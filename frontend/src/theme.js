// import { createContext, useState, useMemo } from "react";
// import { createTheme } from "@mui/material/styles";
// import { ModeEdit } from "@mui/icons-material";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primaryBlue: {
          100: "#cdd4e2",
          200: "#9caac4",
          300: "#6a7fa7",
          400: "#395589",
          500: "#072a6c",
          600: "#062256",
          700: "#041941",
          800: "#03112b",
          900: "#010816",
        },
        //Teal - Accent
        accentTeal: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        //Grey
        grey: {
          100: "#ccf1f1",
          200: "#99e4e4",
          300: "#66d6d6",
          400: "#33c9c9",
          500: "#00bbbb",
          600: "#009696",
          700: "#007070",
          800: "#004b4b",
          900: "#002525",
        },
      }
    : {
        primaryBlue: {
          100: "#010816",
          200: "#03112b",
          300: "#041941",
          400: "#062256",
          500: "#072a6c",
          600: "#395589",
          700: "#6a7fa7",
          800: "#9caac4",
          900: "#cdd4e2",
        },
        //Teal - Accent
        accentTeal: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        //Grey
        grey: {
          100: "#002525",
          200: "#004b4b",
          300: "#007070",
          400: "#009696",
          500: "#00bbbb",
          600: "#33c9c9",
          700: "#66d6d6",
          800: "#99e4e4",
          900: "#ccf1f1",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              //access to all shades of primaryBlue
         
              main: colors.primaryBlue[500],
            },
            secondary: {
              //access to all shades of accentTeal
        
              main: colors.accentTeal[500],
            },
            neutral: {
              //access to all shade of grey
         
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primaryBlue[500],
            },
          }
        : {
            primary: {
            
              main: colors.primaryBlue[100],
            },
            secondary: {
             
              main: colors.accentTeal[500],
            },
            neutral: {
         
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// // colorMode Context

// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");
//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return [theme, colorMode];
// };
