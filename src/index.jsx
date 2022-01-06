import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/AppRouter";
// import { Provider } from 'react-redux';
// import store from './store/store';
import "./theme/main.scss";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

let theme = createTheme({
  typography: {
    fontFamily: "iranyekan, Arial",
  },
});

theme = responsiveFontSizes(theme);

const helmetContext = {};
function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          {/* <Provider
         store={store}
        > */}
          <AppRouter />
          {/* </Provider> */}
        </React.StrictMode>
      </ThemeProvider>
    </HelmetProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
