import { Helmet } from "react-helmet";
import "./style.scss";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ButtonGroup, Button, ClickAwayListener, BackdropUnstyled, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>هاردساب انیمه | AW_DL</title>
      </Helmet>
      <div>

        <Typography component="div" style={{textAlign:"right",margin:"50px"}} variant="h5">انیمه های فصلی</Typography>
        <Paper
          component="form"
          sx={{
            display: "flex",
            width: "35%",
            height: "300px",
            marginTop: "62px",
            position: "fixed",
            zIndex: "25",
          }}
        >
          <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg"/>
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
