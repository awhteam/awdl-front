import "./anilist.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Keyboard } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import { useMobile } from "../../utils/detectSource";
import { Link } from "react-router-dom";
import { baseUrl,cdnUrl } from "../../utils/constants";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';


SwiperCore.use([Navigation, Keyboard]);

export const AnilistCard = ({ anime }) => {
  return (
    <div className="anilist-card">
    <Link className="content" to={`/anime/${anime.mal_id}`}>
      <div className="cover">
        <img src={`${cdnUrl}${anime.cover_image}`} />
      </div>
      <div className="title">{anime.title[1]?? anime.title[0]}</div>
    </Link>
    </div>
  );
};

export const AnimeSlider = ({ animeList }) => {
  return (
    <div className="carousal-container">
      <Swiper slidesPerView={"auto"} navigation={useMobile() ? false : true}>
        {animeList.map((anime, i) => (
          <SwiperSlide key={i}>
            <AnilistCard anime={anime} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export const AnilistCardLayout = ({ animeList }) => {

  const customTheme = createTheme({
    typography: {
      fontFamily: 'Vazir, Arial',
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 850,
        lg: 1000,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      rowSpacing={6}
      columnSpacing={6}

    >
      {animeList.map((anime, i) => (
        <Grid item md={3} sm={4} xs={6} lg={2.4} key={`anilist-mal-card${i}`}>
          <AnilistCard key={`anilist-card_${i}`} anime={anime} />
        </Grid>
      ))}
    </Grid>
    </ThemeProvider>
  );
};