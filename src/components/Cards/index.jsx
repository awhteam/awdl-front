import * as React from "react";

import "./style.scss";

import { Menu, MenuItem, Typography, Button, Grid, dividerClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MALCard = () => {
  return (
    <div className="mal-card">
      <div className="mal-card__title">
        <a
          href="https://myanimelist.net/anime/40834/Ousama_Ranking"
          className="link-title"
        >
          Ousama Ranking
        </a>
      </div>
      <div className="mal-card__prodsrc">
        <span className="producer">
          <a href="/anime/producer/858/Wit_Studio" title="Wit Studio">
            Wit Studio
          </a>
        </span>
        <div className="eps">
          <a href="https://myanimelist.net/anime/40834/Ousama_Ranking/episode">
            <span>23 eps</span>
          </a>
        </div>
        <span className="source">Web manga</span>
      </div>
      <div className="mal-card__genres">
        <span className="genre">
          <a href="/anime/genre/2/Adventure" title="Adventure">
            ماجراجویی
          </a>
        </span>
        <span className="genre">
          <a href="/anime/genre/10/Fantasy" title="Fantasy">
            فانتزی
          </a>
        </span>
      </div>

      <div className="mal-card__image">
        <img
          src="https://cdn.myanimelist.net/images/anime/1347/117616.webp"
          width="167"
          alt="Ousama Ranking"
          srcset="https://cdn.myanimelist.net/images/anime/1347/117616.webp 1x, https://cdn.myanimelist.net/images/anime/1347/117616.webp 2x"
        />
      </div>

      <div className="mal-card__synopsis">
        این داستان "جنگ های گل رز" که در قرون وسطا رخ داد را به تصویر می کشد
        .نبردی خونین بین رزهای سفید یورک و رزهای سرخ لنستر بر سر پادشاهی
        ...انگلستان. ریچارد پسر سوم خانواده یورک با رازی بزرگ متولد می شود.او...
      </div>

      <div className="mal-card__information">
        <div className="info">
          TV -<span>Oct 15, 2021, 00:55 (JST) </span>
        </div>
        <div className="scormem">
          <span className="member" title="Members">
            <FontAwesomeIcon icon="user" className="mr4" />
            140,820
          </span>
          <span className="score" title="Score">
            <FontAwesomeIcon icon={["far", "star"]} className="mr4" />
            8.86
          </span>
        </div>
      </div>
    </div>
  );
};

export const AllCards = () => {
  return (
    <div >
      <Grid
        style={{ display: "flex",margin:'auto' }}
        justifyContent="center"
        alignItems="center"
        container
        rowSpacing={4}
        md={8}
        xs={10}
      >
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <MALCard />
        </Grid>
      </Grid>
    </div>
  );
};
