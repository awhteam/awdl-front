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
import { HelmetProvider } from "react-helmet-async";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fab, fas, far);

let theme = createTheme({
  palette: {
    primary: {
      main: "#255dad",
    },
  },
  typography: {
    fontFamily: "Vazir , Arial",
  },
});


theme = responsiveFontSizes(theme);

const helmetContext = {};

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}


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
