import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import './theme/main.scss';
import { createTheme, ThemeProvider,responsiveFontSizes } from '@mui/material/styles';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { far} from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas,far)


let theme = createTheme({
  typography: {
    fontFamily: 'iranyekan, Arial',
  },
});

theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </React.StrictMode>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
