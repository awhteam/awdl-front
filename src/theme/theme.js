import VazirWoff2 from '../assets/fonts/woff2/VazirWebRegular.woff2';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Vazir, Arial',
    }
  })
);
