import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import getLPTheme from "./getLPTheme";
import ProductPage from "./ProductPage";
import LandingPage from "./LandingPage";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Pro from "./Pro";
import Docs from "./components/Docs";



function App() {
  const LPtheme = createTheme(getLPTheme("dark"));

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <Router> 
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/deploy" component={Pro} />
          <Route path="/docs" component={Docs} />
          <Route path="/pricing" component={Pricing} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
