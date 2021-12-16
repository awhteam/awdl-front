import * as React from "react";

import "./style.scss";
import ousamaImage from "../../assets/images/ousama_ranking.webp";
import { Menu, MenuItem, Typography, Button, Grid, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../utils/helpers'
export const MALCard = () => {
  const animeData = {
    id: 40834,
    title: "Ousama Ranking",
    studio: {
      id: 858,
      name: "Wit Studio",
    },
    epi: 23,
    source: "Web manga",
    genres: [
      {
        id: 1,
        name: "ماجراجویی",
      },
      {
        id: 2,
        name: "فانتزی",
      },
    ],
    poster: ousamaImage,
    synposis: `        این داستان "جنگ های گل رز" که در قرون وسطا رخ داد را به تصویر می کشد
    .نبردی خونین بین رزهای سفید یورک و رزهای سرخ لنستر بر سر پادشاهی
    ...انگلستان. ریچارد پسر سوم خانواده یورک با رازی بزرگ متولد می شود.او...`,
    release_date:"TV - Oct 15, 2021, 00:55 (JST) ",
    score:8.86,
    members:140820,

  };

  return (
    <div className="mal-card">
      <div className="mal-card__title">
        <a
          href={`https://myanimelist.net/anime/${animeData.id}`}
          className="link-title"
        >
          {animeData.title}
        </a>
      </div>
      <div className="mal-card__prodsrc">
        <span className="producer">
          <a
            href={`https://myanimelist.net/anime/producer/${animeData.studio.id}`}
            title={animeData.studio.name}
          >
            {animeData.studio.name}
          </a>
        </span>
        <div className="eps">
          <span>
            {animeData.epi} ep{animeData.epi > 1 && "s"}
          </span>
        </div>
        <span className="source">{animeData.source}</span>
      </div>
      <div className="mal-card__genres">
        {animeData.genres.map((genre) => (
          <Chip
            label={genre.name}
            size="small"
            component={Link}
            to={`/anime/genre/${genre.id}`}
          />
        ))}
      </div>

      <div className="mal-card__image">
        <img src={animeData.poster} width="167" alt={animeData.title} />
      </div>

      <div className="mal-card__synopsis">
     {animeData.synposis}
      </div>

      <div className="mal-card__information">
        <span className="info release-date">
          {animeData.release_date}
        </span>
        <span className="info">
          <FontAwesomeIcon icon={["far", "star"]} className="mr4" />
          {animeData.score}
        </span>
        <span className="info">
          <FontAwesomeIcon icon="user" className="mr4" />
          {numberWithCommas(animeData.members)}
        </span>
      </div>
    </div>
  );
};

export const AllCards = () => {
  return (
    <div>
      <Grid
        container
        style={{margin:'auto'}}
        alignItems="center"
        justifyContent="center"
        rowSpacing={4}
        md={10}
        xl={8.5}
      >
        {[...Array(6)].map((x, i) => (
          <Grid item md={6} sm={6} xs={12} xl={4} key={i}>
            <MALCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
