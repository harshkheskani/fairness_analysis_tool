import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//Dark and light color code

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#cdccd2",
          200: "#9a99a4",
          300: "#686677",
          400: "#353349",
          500: "#03001c",
          600: "#020016",
          700: "#020011",
          800: "#01000b",
          900: "#010006",
        },

        //Teal
        tealAccent: {
          100: "#f0fbf8",
          200: "#e2f7f0",
          300: "#d3f2e9",
          400: "#c5eee1",
          500: "#b6eada",
          600: "#92bbae",
          700: "#6d8c83",
          800: "#495e57",
          900: "#242f2c",
        },

        //accent blue
        blueAccent: {
          100: "#dee9f1",
          200: "#bdd2e3",
          300: "#9dbcd5",
          400: "#7ca5c7",
          500: "#5b8fb9",
          600: "#497294",
          700: "#37566f",
          800: "#24394a",
          900: "#121d25",
        },

        //grey
        grey: {
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

        //red accent
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
      }
    : {
        primary: {
          100: "#010006",
          200: "#01000b",
          300: "#020011",
          400: "#020016",
          500: "#03001c",
          600: "#353349",
          700: "#686677",
          800: "#9a99a4",
          900: "#cdccd2",
        },

        //Teal
        tealAccent: {
          100: "#242f2c",
          200: "#495e57",
          300: "#6d8c83",
          400: "#92bbae",
          500: "#b6eada",
          600: "#c5eee1",
          700: "#d3f2e9",
          800: "#e2f7f0",
          900: "#f0fbf8",
        },

        //accent blue
        blueAccent: {
          100: "#121d25",
          200: "#24394a",
          300: "#37566f",
          400: "#497294",
          500: "#5b8fb9",
          600: "#7ca5c7",
          700: "#9dbcd5",
          800: "#bdd2e3",
          900: "#dee9f1",
        },

        //grey
        grey: {
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

        //red accent
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
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
            background: {
              default: colors.primary[500],
            },
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.tealAccent[500],
            },
            neutral: {
              main: colors.grey[500],
              dark: colors.grey[700],
              light: colors.grey[100],
            },
          }
        : {
            background: {
              default: "#fcfcfc",
            },
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.tealAccent[500],
            },
            neutral: {
              main: colors.grey[500],
              dark: colors.grey[700],
              light: colors.grey[100],
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

// React Context for color mode

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(() => ({
    toggleColorMode: () =>
      setMode((prev) => (prev === "light" ? "dark" : "light")),
  }));

  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])

  return [theme, colorMode];
};
