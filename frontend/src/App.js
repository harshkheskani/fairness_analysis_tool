import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import SearchBar from './components/SearchBar';
import Dashboard from "./pages/dashboard/Dashboard";
import { ProSidebarProvider } from 'react-pro-sidebar';


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <main className="content">
            

            <Topbar />

            { /* URL ROUTING */}
            <Routes>
              {/*<Route path = "/" element = {<Homepage />}/> */}
            </Routes>
          </main>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
