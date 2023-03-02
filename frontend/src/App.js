import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Footer from "./scenes/global/Footer";
import Dashboard from "./scenes/dashboard";
import HomePage from './scenes/home';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import RenderDocText from "./components/RenderDocText";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
            <Footer />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/doctext/:id" element={<RenderDocText />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
