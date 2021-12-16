import * as React from "react";

import "./style.scss";
import ousamaImage from "../../assets/images/ousama_ranking.webp";
import { Menu, MenuItem, Typography, Button, Grid, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { numberWithCommas,convertDateToJalali} from "../../utils/helpers";
import {genres} from "../../utils/genres"
export const MALCard = (animeData) => {
  const anime = animeData.animeData;
  console.log("anime Data", anime);
  return (
    <div className="mal-card">
      <div className="mal-card__title">
        <a
          href={`https://myanimelist.net/anime/${anime.mal_id}`}
          className="link-title"
        >
          {anime.title}
        </a>
      </div>
      <div className="mal-card__prodsrc">
        <span className="producer">
          <a
            href={`https://myanimelist.net/anime/producer/${anime.studio.mal_id}`}
            title={anime.studio.name}
          >
            {anime.studio.name}
          </a>
        </span>
        <div className="eps">
          <span>
          {anime.epi ? anime.epi : '?'} ep{anime.epi > 1 && "s"}
          </span>
        </div>
        <span className="source">{anime.source}</span>
      </div>
      <div className="mal-card__genres">
        {anime.genres.map((genre) => (
          <Chip
            label={genres[genre.mal_id]["fa"]}
            size="small"
            component={"a"}
            href={`/anime/genre/${genre.mal_id}/${genres[genre.mal_id]["en"]}`}
          />
        ))}
      </div>

      <div className="mal-card__image">
        <img src={anime.poster} width="167" alt={anime.title} />
      </div>

      <div className="mal-card__synopsis">{anime.synopsis}</div>

      <div className="mal-card__information">
        <span className="info release-date">{anime.type} - {convertDateToJalali(anime.release_date)}</span>
        <span className="info">
          <FontAwesomeIcon icon={["far", "star"]} className="mr4" />
          {anime.score}
        </span>
        <span className="info">
          <FontAwesomeIcon icon="user" className="mr4" />
          {numberWithCommas(anime.members)}
        </span>
      </div>
    </div>
  );
};

export const AllCards = () => {
  const anime = {
    mal_id: 40834,
    title: "Ousama Ranking",
    studio: {
      mal_id: 858,
      name: "Wit Studio",
    },
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
    synposis: `        این داستان "جنگ های گل رز" که در قرون وسطا رخ داد را به تصویر می کشد
        .نبردی خونین بین رزهای سفید یورک و رزهای سرخ لنستر بر سر پادشاهی
        ...انگلستان. ریچارد پسر سوم خانواده یورک با رازی بزرگ متولد می شود.او...`,
    release_date: "TV - Oct 15, 2021, 00:55 (JST) ",
    score: 8.86,
    members: 140820,
  };
  return (
    <div>
      <Grid
        container
        style={{ margin: "auto" }}
        alignItems="center"
        justifyContent="center"
        rowSpacing={4}
        md={10}
        xl={8.5}
      >
        {[...Array(6)].map((x, i) => (
          <Grid item md={6} sm={6} xs={12} xl={4} key={i}>
            <MALCard animeData={anime} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
