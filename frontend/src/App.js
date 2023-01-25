import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./pages/layout/Layout";
import { useMemo } from "react";

function App() {
  const currentMode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(currentMode)), [currentMode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Layout component will have the navbar and sidebar - as they are on each page */}
            <Route element = {<Layout />}>
              <Route path="/" element={<Navigate to = "/dashboard" replace />}/>
              <Route path="/dashboard" element ={<Dashboard/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
