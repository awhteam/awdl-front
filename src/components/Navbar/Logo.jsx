import logoPic from '../../assets/logo.png';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
      <img alt="لوگوی هاردساب انیمه " className="desktop_navbar__logo" src={logoPic} width="75" />
      <Typography variant="h5" component="p" style={{ fontWeight: 800, color: '#000' }}>
        هاردساب انیمه
      </Typography>
    </Link>
  );
}
