import * as React from "react";

import "./style.scss";
import ousamaImage from "../../assets/images/ousama_ranking.webp";
import {
  Menu,
  MenuItem,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { numberWithCommas, convertDateToJalali } from "../../utils/helpers";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { baseUrl } from "../../utils/constants";
import {
  fa_formats,
  fa_seasons,
  fa_genres,
  fa_themes,
  fa_demographics,
} from "../../utils/translations";

import { createTheme, ThemeProvider } from '@mui/material/styles';



export const MALCard = ({ anime }) => {
  const title = anime.title[1] ? anime.title[1] : anime.title[0];
  return (
    <div className="mal-card">
      <div className="mal-card__title">
        <a
          href={`/anime/${anime.mal_id}`}
          target="_blank"
          className="link-title"
        >
          {title}
        </a>
      </div>
      <div className="mal-card__prodsrc">
        <span className="producer">
          
          {anime.studios_names && Object.entries(anime.studios_names).map(([studioId, studioName],i) => (
            <>
              {i >= 1 && ", "}
              <a
                href={`/anime/studio/${studioId}/${studioName}`}
                title={studioName}
                key={i}
              >
                {studioName}
              </a>
            </>
          ))}
        </span>
        <div className="eps">
          <span>
            {anime.episodes ? anime.episodes : "?"} ep
            {anime.episodes > 1 && "s"}
          </span>
        </div>
        <span className="source">{anime.source}</span>
      </div>
      <div className="mal-card__genres">
        {anime.genres.map(
          (genre, i) =>
            fa_genres[genre] && (
              <Chip
                label={fa_genres[genre]["fa"]}
                size="small"
                component={"a"}
                href={`/anime/genre/${genre}/${fa_genres[genre]["en"]}`}
                key={i}
              />
            )
        )}
      </div>

      <div className="mal-card__image">
        <img src={`${baseUrl}${anime.cover_image}`} width="167" alt={title} />
      </div>

      <div className="mal-card__synopsis">{anime.synopsis}</div>

      <div className="mal-card__information">
        <span className="info release-date">
          {anime.format} - {convertDateToJalali(anime.aired_date)}
        </span>
        <span className="info">
          <FontAwesomeIcon icon={["far", "star"]} className="mr4" />
          {anime.mal_score}
        </span>
        <span className="info members">
          <FontAwesomeIcon icon="user" className="mr4" />
          {numberWithCommas(anime.mal_members)}
        </span>
      </div>
    </div>
  );
};

export const MALCardLayout = ({ animeList }) => {


  const customTheme = createTheme({
    typography: {
      fontFamily: 'iranyekan, Arial',
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1050,
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
      rowSpacing={4}
      style={{ margin: "auto" }}
    >
      {animeList.map((anime, i) => (
        <Grid item md={6} sm={6} xs={10} lg={4} key={`grid-mal-card${i}`}>
          <MALCard key={`mal-card_${i}`} anime={anime} />
        </Grid>
      ))}
    </Grid>
    </ThemeProvider>
  );
};

// export const AWCard = (animeData) => {
//   const anime = animeData.animeData;
//   return (
//     <div className="aw-card">
//       <a
//         href={`/anime/${anime.mal_id}/${anime.title.replace(" ","_")}`}
//         className="aw-card__poster"
//         style={{backgroundImage: `url(${anime.poster})`}}
//       >
//         <span class="title">{anime.title}</span>
//       </a>
//     </div>
//   );
// };

export const WideCard = ({ anime }) => {
  return (
    <div className="wide-card">
      <div className="wide-card__image">
        <img src={anime.poster} />
      </div>
      <div className="wide-card__title">
        <a className="title-link" href={`/anime/${anime.mal_id}`}>
          {anime.title}
        </a>
        <div className="genres">
          {anime.genres.map((genre) => (
            <Chip
              label={fa_genres[genre.mal_id]["fa"]}
              size="small"
              component={"a"}
              href={`/anime/genre/${genre.mal_id}/${
                fa_genres[genre.mal_id]["en"]
              }`}
            />
          ))}
        </div>
      </div>
      <div className="wide-card__score">
        <span>
          <FontAwesomeIcon icon={["far", "star"]} className="mr4 mt4" />
          {anime.score}
        </span>
        <span>
          <FontAwesomeIcon icon="user" className="mr4 mt4" />
          {numberWithCommas(anime.members)}
        </span>
      </div>

      <div className="wide-card__time">
        <span>
          <FontAwesomeIcon icon={["far", "clock"]} className="mr4 mt4" />
          ۹:۳۰
        </span>
        <span>
          <FontAwesomeIcon icon={["far", "calendar"]} className="mr4 mt4" />
          دوشنبه ها
        </span>
      </div>
    </div>
  );
};

export const WideCardDetailCard = ({ anime, setShowList }) => {
  const handleCloseBtn = () => {
    setShowList(true);
  };
  return (
    <div className="wide-card-layout__detailCard">
      <IconButton
        component="span"
        className="close-btn"
        onClick={handleCloseBtn}
      >
        <CancelOutlinedIcon />
      </IconButton>

      <div className="card-copyshode">
        <section className="movie_image">
          <img
            className="movie_poster"
            src="https://api.awdl.ml/images/anime/1347/117616.jpg"
            alt="As Above So Below"
          />
        </section>

        <section className="center">
          <div className="about_movie">
            <h3>{anime.title}</h3>
            <div className="movie_info">
              <p>
                {anime.genres.map((genre) => (
                  <Chip
                    label={fa_genres[genre.mal_id]["fa"]}
                    size="small"
                    component={"a"}
                    href={`/anime/genre/${genre.mal_id}/${
                      fa_genres[genre.mal_id]["en"]
                    }`}
                  />
                ))}{" "}
              </p>
              <p>{anime.studio[0].name}</p>
            </div>
            <div className="movie_desc">
              <p>{anime.synopsis}</p>
            </div>

            <button className="watch">دانلود کن</button>
            <button className="watch" onClick={handleCloseBtn}>
              {" "}
              بازگشت
            </button>
          </div>
        </section>

        <svg
          className="wavy"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
        >
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            style={{
              stroke: "none",
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export const AllCards = () => {
  const [showList, setShowList] = React.useState(true);
  const [selectedAnime, setSelectedAnime] = React.useState(null);

  const anime = {
    mal_id: 40834,
    title: "Ousama Ranking",
    studio: [
      {
        mal_id: 858,
        name: "Wit Studio",
      },
    ],
    epi: 23,
    source: "Web manga",
    type: "TV",
    genres: [
      {
        mal_id: 1,
        name: "ماجراجویی",
      },
      {
        mal_id: 2,
        name: "فانتزی",
      },
    ],
    poster: ousamaImage,
    synopsis: `        این داستان "جنگ های گل رز" که در قرون وسطا رخ داد را به تصویر می کشد
        .نبردی خونین بین رزهای سفید یورک و رزهای سرخ لنستر بر سر پادشاهی
        ...انگلستان. ریچارد پسر سوم خانواده یورک با رازی بزرگ متولد می شود.او...`,
    release_date: "TV - Oct 15, 2021, 00:55 (JST) ",
    score: 8.86,
    members: 140820,
  };

  const weekdays = [
    { i: 6, en: "saturday", fa: "شنبه" },
    { i: 7, en: "sunday", fa: "یکشنبه" },
    { i: 1, en: "monday", fa: "دوشنبه" },
    { i: 2, en: "tuesday", fa: "سه‌شنبه" },
    { i: 3, en: "wednesday", fa: "چهارشنبه" },
    { i: 4, en: "thursday", fa: "پنجشنبه" },
    { i: 5, en: "friday", fa: "جمعه" },
  ];
  const today = new Date().getDay();

  const handleSelectedAnime = (anime) => {
    setShowList(false);
    setSelectedAnime(anime);
  };

  return (
    <div className="wide-card-layout" style={{ margin: "100px" }}>
      {showList ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[...Array(5)].map((x, i) => (
            <div
              style={{ margin: "5px" }}
              onClick={() => handleSelectedAnime(anime)}
            >
              <WideCard anime={anime} key={i} />
            </div>
          ))}
          <div className="wide-card-layout__days">
            {weekdays.map((day, idx) => (
              <div className={`day ${day.i == today && "today"}`} key={idx}>
                {day.fa}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <WideCardDetailCard anime={selectedAnime} setShowList={setShowList} />
      )}
    </div>
  );
};
